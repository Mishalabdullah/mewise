from django.db import models
from django.contrib.auth.models import User

class DataManager(models.Manager):
    def data_of_user(self, user):
        return self.filter(user=user)

class Quotes(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=False)
    objects = DataManager()

    def __str__(self):
        return self.description

    class Meta:
        order_with_respect_to = 'user'