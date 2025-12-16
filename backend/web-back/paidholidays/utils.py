import calendar
from collections import defaultdict
from datetime import date, timedelta

from django.db.models import Sum
from django.db.models.functions import Coalesce

from .models import CarryOver, PaidHolidays

HOURS_PER_DAY = 7.75  # 1日=7時間45分換算


def monthly_paidholiday_hours(queryset=None):
    qs = queryset or PaidHolidays.objects.all()
    monthly = defaultdict(float)

    for ph in qs:
        start = ph.start_date
        end = ph.end_date or ph.start_date
        total_days = (end - start).days + 1

        # 取得が1時間単位のみの場合: ph.hour をそのまま使う
        total_hours = ph.hour + ph.date * HOURS_PER_DAY

        current = start
        while current <= end:
            month_end = date(
                current.year,
                current.month,
                calendar.monthrange(current.year, current.month)[1],
            )
            segment_end = min(month_end, end)
            days_in_segment = (segment_end - current).days + 1

            monthly[current.strftime("%Y-%m")] += (
                total_hours * days_in_segment / total_days
            )

            current = segment_end + timedelta(days=1)

    return dict(monthly)


def calculate_paidholiday_summary(user):
    summary_dict = PaidHolidays.objects.filter(user=user).aggregate(
        sum_input_date=Coalesce(Sum("date"), 0), sum_input_hour=Coalesce(Sum("hour"), 0)
    )

    carry = CarryOver.objects.filter(user=user).first()
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

    return summary_dict
