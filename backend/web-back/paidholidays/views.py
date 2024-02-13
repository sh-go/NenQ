import sys

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.http import JsonResponse
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt import exceptions as jwt_exp
from rest_framework_simplejwt import views as jwt_views

from .models import CarryOver, PaidHolidays
from .serializers import PaidHolidaysSerializer

sys.path.append("../")
from users.serializers import RegisterSerializer, UserSerializer


@api_view(["GET"])
def get_summary_data(request):
    summary_dict = PaidHolidays.objects.filter(user=request.user).aggregate(
        sum_input_date=Coalesce(Sum("date"), 0), sum_input_hour=Coalesce(Sum("hour"), 0)
    )

    carry = CarryOver.objects.first()
    if carry is None:
        carry_over_data = 0
    else:
        carry_over_data = carry.carry_over

    summary_dict["sum_input_all"] = (
        summary_dict["sum_input_date"] * 31 + summary_dict["sum_input_hour"] * 4
    )
    summary_dict["used_date"] = summary_dict["sum_input_all"] // 31
    summary_dict["used_hour"] = (summary_dict["sum_input_all"] % 31) // 4
    summary_dict["used_min"] = (summary_dict["sum_input_all"] % 31) % 4 * 15

    init = 20 + carry_over_data
    summary_dict["remain_15min"] = init * 31 - summary_dict["sum_input_all"]
    summary_dict["remain_date"] = summary_dict["remain_15min"] // 31
    summary_dict["remain_hour"] = (summary_dict["remain_15min"] % 31) // 4
    summary_dict["remain_min"] = (summary_dict["remain_15min"] % 31) % 4 * 15

    return Response(summary_dict)


class ListPaidHolidays(generics.ListAPIView):
    def get_queryset(self):
        return PaidHolidays.objects.filter(user=self.request.user).order_by("-update")

    serializer_class = PaidHolidaysSerializer


class DetailPaidHolidays(generics.RetrieveAPIView):
    queryset = PaidHolidays.objects.all()
    serializer_class = PaidHolidaysSerializer


class CreatePaidHolidays(generics.CreateAPIView):
    queryset = PaidHolidays.objects.all()
    serializer_class = PaidHolidaysSerializer


class DeletePaidHolidays(generics.DestroyAPIView):
    queryset = PaidHolidays.objects.all()
    serializer_class = PaidHolidaysSerializer


class TokenObtainView(jwt_views.TokenObtainPairView):
    # Token発行
    def post(self, request, *args, **kwargs):
        # 任意のSerializerを引っ張ってくる(今回はTokenObtainPairViewで使われているserializers.TokenObtainPairSerializer)
        serializer = self.get_serializer(data=request.data)
        # 検証
        try:
            serializer.is_valid(raise_exception=True)
        # エラーハンドリング
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        res = Response(serializer.validated_data, status=status.HTTP_200_OK)

        try:
            res.delete_cookie("access_token")
        except Exception as e:
            print(e)

        # CookieヘッダーにTokenをセットする
        res.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            max_age=60 * 60 * 24,  # 24時間
            httponly=True,
        )
        res.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            max_age=60 * 60 * 24 * 30,  # 30日間
            httponly=True,
        )

        # 最終的にはaccess_tokenとrefresh_tokenを返してもらう
        return res


class UserRegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer

    @transaction.atomic
    def post(self, request):
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(generics.views.APIView):
    # authentication_classes = ()
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, JWT):
        try:
            payload = jwt.decode(jwt=JWT, key=settings.SECRET_KEY, algorithms=["HS256"])
            return get_user_model().objects.get(uuid=payload["user_id"])

        except jwt.ExpiredSignatureError:
            return "Activations link expired"
        except jwt.exceptions.DecodeError:
            return f"Invalid Token {payload}"
        except get_user_model().DoesNotExist:
            return "user does not exists"

    def get(self, request, format=None):
        JWT = request.COOKIES.get("access_token")

        if not JWT:
            return Response({"error": "No token"}, status=status.HTTP_400_BAD_REQUEST)

        user = self.get_object(JWT)

        if type(user) == str:
            return Response({"error": user}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_active:
            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response(
            {"error": "user is not active"}, status=status.HTTP_400_BAD_REQUEST
        )


def get_refresh_token(request):
    try:
        refresh_token = request.COOKIES("refresh_token")
        return JsonResponse({"refresh": refresh_token}, safe=False)
    except Exception as e:
        print(e)
        return None


class TokenRefresh(jwt_views.TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        res = Response(serializer.validated_data, status=status.HTTP_200_OK)
        res.delete_cookie("user_token")
        res.set_cookie(
            "user_token",
            serializer.validated_data["access"],
            max_age=60 * 24 * 24 * 30,
            httponly=True,
        )
        return res
