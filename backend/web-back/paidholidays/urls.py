from django.urls import path

from .views import (
    CreatePaidHolidays,
    DeletePaidHolidays,
    DetailPaidHolidays,
    ListPaidHolidays,
    LogoutView,
    TokenObtainView,
    TokenRefresh,
    UpdatePaidHolidays,
    UserAPIView,
    UserRegisterView,
    get_summary_data,
)

urlpatterns = [
    path("list", ListPaidHolidays.as_view()),
    path("create", CreatePaidHolidays.as_view()),
    path("update/<int:pk>", UpdatePaidHolidays.as_view()),
    path("delete/<int:pk>", DeletePaidHolidays.as_view()),
    path("<int:pk>", DetailPaidHolidays.as_view()),
    path("summary", get_summary_data),
    path("user", UserAPIView.as_view()),
    path("user/create", UserRegisterView.as_view()),
    path("token", TokenObtainView.as_view()),
    path("token/refresh", TokenRefresh.as_view()),
    path("logout", LogoutView.as_view()),
]
