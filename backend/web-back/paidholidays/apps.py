from django.apps import AppConfig


class PaidHolidaysConfig(AppConfig):
    name = "paidholidays"

    def ready(self):
        import paidholidays.signals  # noqa: F401
