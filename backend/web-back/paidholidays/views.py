from django.db.models import Sum
from django.db.models.functions import Coalesce
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from .models import CarryOver, PaidHolidays
from .serializers import PaidHolidaysSerializer


@api_view(["GET"])
def get_summary_data(request):
    summary_dict = PaidHolidays.objects.filter(author=request.user).aggregate(
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


class ListPaidHolidays(ListAPIView):
    def get_queryset(self):
        return PaidHolidays.objects.filter(author=self.request.user).order_by("-update")

    serializer_class = PaidHolidaysSerializer


class DetailPaidHolidays(RetrieveAPIView):
    queryset = PaidHolidays.objects.all()
    serializer_class = PaidHolidaysSerializer
