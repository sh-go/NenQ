from django.urls import path

from .views import (
    DetailPaidHolidays,
    ListPaidHolidays,
    TokenObtainView,
    TokenRefresh,
    UserAPIView,
    get_refresh_token,
    get_summary_data,
)

urlpatterns = [
    path("", ListPaidHolidays.as_view()),
    path("<int:pk>/", DetailPaidHolidays.as_view()),
    path("summary/", get_summary_data),
    path("user/", UserAPIView.as_view()),
    path("user/token", TokenObtainView.as_view()),
    path("user/refresh/", get_refresh_token),
    path("user/refresh/token", TokenRefresh.as_view()),
]
