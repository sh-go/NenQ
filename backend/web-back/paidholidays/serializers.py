from rest_framework import serializers

from .models import CarryOver, PaidHolidays


class PaidHolidaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaidHolidays
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.update = validated_data.get("update", instance.update)
        instance.date = validated_data.get("date", instance.date)
        instance.hour = validated_data.get("hour", instance.hour)
        instance.text = validated_data.get("text", instance.text)
        instance.slug = validated_data.get("slug", instance.slug)
        instance.save()
        return instance


class CarryOverSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarryOver
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.date = validated_data.get("date", instance.date)
        instance.hour = validated_data.get("hour", instance.hour)
        instance.min = validated_data.get("min", instance.min)
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
