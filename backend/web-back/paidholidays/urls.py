from django.urls import path

from .views import DetailPaidHolidays, ListPaidHolidays

urlpatterns = [
    path("<int:pk>/", DetailPaidHolidays.as_view()),
    path("", ListPaidHolidays.as_view()),
]
