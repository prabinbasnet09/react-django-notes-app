from django.db import models


class Notes(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField(null=True, blank=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
