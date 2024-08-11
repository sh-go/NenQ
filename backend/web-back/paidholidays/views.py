import sys

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.db import transaction
from django.db.models import ProtectedError, Sum
from django.db.models.functions import Coalesce
from django.http import JsonResponse
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt import exceptions as jwt_exp
from rest_framework_simplejwt import tokens as jwt_tokens
from rest_framework_simplejwt import views as jwt_views

from .models import CarryOver, PaidHolidays
from .serializers import (
    CarryOverSerializer,
    ChangePasswordSerializer,
    PaidHolidaysSerializer,
)

sys.path.append("../")
from users.serializers import RegisterSerializer, UserSerializer


@api_view(["GET"])
def get_summary_data(request):
    summary_dict = PaidHolidays.objects.filter(user=request.user).aggregate(
        sum_input_date=Coalesce(Sum("date"), 0), sum_input_hour=Coalesce(Sum("hour"), 0)
    )

    carry = CarryOver.objects.filter(user=request.user).first()
    if carry is None:
        carry_over_date = 0
        carry_over_hour = 0
        carry_over_min = 0
    else:
        carry_over_date = carry.date
        carry_over_hour = carry.hour
        carry_over_min = carry.min

    summary_dict["sum_input_all"] = (
        summary_dict["sum_input_date"] * 31 + summary_dict["sum_input_hour"] * 4
    )
    summary_dict["used_date"] = summary_dict["sum_input_all"] // 31
    summary_dict["used_hour"] = (summary_dict["sum_input_all"] % 31) // 4
    summary_dict["used_min"] = (summary_dict["sum_input_all"] % 31) % 4 * 15

    init = (20 + carry_over_date) * 31 + carry_over_hour * 4 + carry_over_min // 15
    summary_dict["remain_15min"] = init - summary_dict["sum_input_all"]
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


class UpdatePaidHolidays(generics.views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def patch(self, request, pk):
        db_data = PaidHolidays.objects.filter(id=pk).first()

        if not db_data:
            return Response(
                {"message": "No data found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = PaidHolidaysSerializer(
            instance=db_data, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Update successfully"}, status=status.HTTP_202_ACCEPTED
            )
        else:
            return Response({"message": "failed", "details": serializer.errors})


class DeletePaidHolidays(generics.DestroyAPIView):
    queryset = PaidHolidays.objects.all()
    serializer_class = PaidHolidaysSerializer


class DeleteAllPaidHolidays(generics.views.APIView):
    def delete(self, request):
        try:
            PaidHolidays.objects.filter(user=self.request.user).delete()
            return Response(
                {"message": "Delete all successfully"}, status=status.HTTP_202_ACCEPTED
            )
        except ProtectedError as e:
            return Response({"message": e}, status=status.HTTP_400_BAD_REQUEST)


class GetCarryOver(generics.views.APIView):
    def get(self, request, format=None):
        data = CarryOver.objects.filter(user=request.user).first()
        serializer = CarryOverSerializer(data)
        return Response(serializer.data)


class UpdateCarryOver(generics.views.APIView):
    def patch(self, request):
        db_data = CarryOver.objects.filter(user=request.user).first()

        if not db_data:
            return Response(
                {"message": "No data found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = CarryOverSerializer(
            instance=db_data, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Update successfully"}, status=status.HTTP_202_ACCEPTED
            )
        else:
            return Response({"message": "failed"}, status=serializer.errors)


class UserRegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer

    @transaction.atomic
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(generics.views.APIView):
    permission_classes = ()
    authentication_classes = ()

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

        if isinstance(user, str):
            return Response({"error": user}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_active:
            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response(
            {"error": "user is not active"}, status=status.HTTP_400_BAD_REQUEST
        )


class TokenObtainView(jwt_views.TokenObtainPairView):
    # Token発行
    def post(self, request, *args, **kwargs):
        # 任意のSerializerを引っ張ってくる(今回はTokenObtainPairViewで使われているserializers.TokenObtainPairSerializer)
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)

        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        res = Response(serializer.validated_data, status=status.HTTP_200_OK)

        try:
            res.delete_cookie("access_token")
        except Exception as e:
            Response(e)

        # CookieヘッダーにTokenをセットする
        res.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            max_age=60 * 1,  # 2分
            httponly=True,
            samesite="None",
            secure=True,
        )
        res.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            max_age=60 * 1,  # 6分
            httponly=True,
            samesite="None",
            secure=True,
        )

        # 最終的にはaccess_tokenとrefresh_tokenを返してもらう
        return res


@api_view(["GET"])
@permission_classes(())
def get_refresh_token(request):
    try:
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No token"}, status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse({"refresh": refresh_token}, safe=False)
    except Exception as e:
        return Response(e)


class TokenRefresh(jwt_views.TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        res = Response(serializer.validated_data, status=status.HTTP_200_OK)
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")
        res.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            max_age=60 * 1,
            httponly=True,
            samesite="None",
            secure=True,
        )
        res.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            max_age=60 * 1,
            httponly=True,
            samesite="None",
            secure=True,
        )

        return res


class LogoutView(generics.views.APIView):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        try:
            res = Response()
            res.delete_cookie("access_token")
            res.delete_cookie("refresh_token")
        except Exception:
            return Response(
                {"Error": "cannnot delete tokens in cookie"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = jwt_tokens.RefreshToken(refresh_token)
            token.blacklist()
            return res
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user
        if user.check_password(serializer.data.get("old_password")):
            user.set_password(serializer.data.get("new_password"))
            user.save()
            update_session_auth_hash(request, user)
            return Response(
                {"message": "Password changed successfully"}, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Old password is not correct"}, status=status.HTTP_400_BAD_REQUEST
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
