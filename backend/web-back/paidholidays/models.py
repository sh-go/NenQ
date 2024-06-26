from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


# Create your models here.
class PaidHolidays(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="user_paidholidays",
    )
    update = models.DateField(default=timezone.now)
    date = models.PositiveIntegerField(null=True, blank=False, default=0)
    hour = models.PositiveIntegerField(null=True, blank=False, default=0)
    text = models.CharField(
        max_length=20,
        choices=(("休暇", "休暇"), ("遅刻", "遅刻"), ("早退", "早退")),
        default="休暇",
    )
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.update} - 取得日数{self.date} - 取得時間{self.hour} - {self.text}"


class CarryOver(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="user_carryover",
    )
    date = models.PositiveIntegerField(null=True, blank=False, default=0)
    hour = models.PositiveIntegerField(null=True, blank=False, default=0)
    min = models.PositiveIntegerField(null=True, blank=False, default=0)

    def __str__(self):
        return f"{self.user} - 繰り越し{self.date}日{self.hour}時間{self.min}分"


@receiver(signal=post_save, sender=get_user_model())
def create_carryover(sender, **kwargs):
    # ユーザー作成時に繰り越し分を０日として追加する
    if kwargs["created"]:
        return CarryOver.objects.get_or_create(user=kwargs["instance"])
