from django.urls import path

from .views import DetailPaidHolidays, ListPaidHolidays, get_summary_data

urlpatterns = [
    path("", ListPaidHolidays.as_view()),
    path("<int:pk>/", DetailPaidHolidays.as_view()),
    path("summary/", get_summary_data),
]
