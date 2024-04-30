from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("paidholidays.urls")),
    path("api/password_reset/", include("django_rest_passwordreset.urls")),
]
