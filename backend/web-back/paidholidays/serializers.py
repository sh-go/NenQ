from rest_framework import serializers

from .models import CarryOver, PaidHolidays


class PaidHolidaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaidHolidays
        fields = "__all__"


class CarryOverSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarryOver
        fields = "__all__"
