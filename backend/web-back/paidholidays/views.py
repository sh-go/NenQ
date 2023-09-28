from rest_framework import generics

from .models import CarryOver, PaidHolidays
from .serializers import CarryOverSerializer, PaidHolidaysSerializer


class ListPaidHolidays(generics.ListAPIView):
    queryset = PaidHolidays.objects.all()
    serializer_class = PaidHolidaysSerializer


class DetailPaidHolidays(generics.RetrieveAPIView):
    queryset = CarryOver.objects.all()
    serializer_class = CarryOverSerializer
