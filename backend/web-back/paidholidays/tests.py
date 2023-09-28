from django.test import TestCase

# Create your tests here.
from .models import PaidHolidays, CarryOver


class PaidHolidaysModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        PaidHolidays.objects.create(date=1, hour=0, text="休暇", author="しゅうご")

    def test_date_content(self):
        paidholidays = PaidHolidays.objects.get(id=1)
        excepted_object_name = f"{paidholidays.date}"
        self.assertEqual(excepted_object_name, "1")

    def test_hour_content(self):
        paidholidays = PaidHolidays.objects.get(id=1)
        excepted_object_name = f"{paidholidays.hour}"
        self.assertEqual(excepted_object_name, "0")

    def test_text_content(self):
        paidholidays = PaidHolidays.objects.get(id=1)
        excepted_object_name = f"{paidholidays.text}"
        self.assertEqual(excepted_object_name, "休暇")

    def test_author_content(self):
        paidholidays = PaidHolidays.objects.get(id=1)
        excepted_object_name = f"{paidholidays.author}"
        self.assertEqual(excepted_object_name, "しゅうご")
