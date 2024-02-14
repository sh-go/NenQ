from django.urls import path

from .views import (
    CreatePaidHolidays,
    DeletePaidHolidays,
    DetailPaidHolidays,
    ListPaidHolidays,
    TokenObtainView,
    TokenRefresh,
    UserAPIView,
    UserRegisterView,
    get_refresh_token,
    get_summary_data,
)

urlpatterns = [
    path("", ListPaidHolidays.as_view()),
    path("create/", CreatePaidHolidays.as_view()),
    path("delete/<int:pk>/", DeletePaidHolidays.as_view()),
    path("<int:pk>/", DetailPaidHolidays.as_view()),
    path("summary/", get_summary_data),
    path("user/", UserAPIView.as_view()),
    path("user/create/", UserRegisterView.as_view()),
    path("user/token/", TokenObtainView.as_view()),
    path("user/refresh/", get_refresh_token),
    path("user/refresh/token/", TokenRefresh.as_view()),
]
