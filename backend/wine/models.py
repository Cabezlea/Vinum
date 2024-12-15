from django.db import models

class Wine(models.Model):
    name = models.CharField(max_length=200)
    vintage = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    region = models.CharField(max_length=100)
    grape_variety = models.CharField(max_length=100)
    alcohol_content = models.DecimalField(max_digits=4, decimal_places=2)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
