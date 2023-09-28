from django.contrib import admin
from .models import PaidHolidays, CarryOver

# Register your models here.
admin.site.register(PaidHolidays)
admin.site.register(CarryOver)
