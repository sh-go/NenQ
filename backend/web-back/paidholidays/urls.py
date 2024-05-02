from django.urls import path

from .views import (
    CreatePaidHolidays,
    DeletePaidHolidays,
    DetailPaidHolidays,
    GetCarryOver,
    ListPaidHolidays,
    LogoutView,
    TokenObtainView,
    TokenRefresh,
    UpdateCarryOver,
    UpdatePaidHolidays,
    UserAPIView,
    UserRegisterView,
    change_password,
    get_refresh_token,
    get_summary_data,
)

urlpatterns = [
    path("list", ListPaidHolidays.as_view()),
    path("create", CreatePaidHolidays.as_view()),
    path("update/<int:pk>", UpdatePaidHolidays.as_view()),
    path("delete/<int:pk>", DeletePaidHolidays.as_view()),
    path("<int:pk>", DetailPaidHolidays.as_view()),
    path("summary", get_summary_data),
    path("carryover", GetCarryOver.as_view()),
    path("carryover/update", UpdateCarryOver.as_view()),
    path("user", UserAPIView.as_view()),
    path("user/create", UserRegisterView.as_view()),
    path("token", TokenObtainView.as_view()),
    path("refresh", get_refresh_token),
    path("refresh/token", TokenRefresh.as_view()),
    path("logout", LogoutView.as_view()),
    path("change_password", change_password),
]
