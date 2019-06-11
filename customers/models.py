from django.db import models

# Create your models here.
class Customer(models.Model):

    first_name = models.CharField('First Name', max_length=255)
    last_name = models.CharField('Last Name', max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField('Joined Date', auto_now_add=True)
    modified_at = models.DateTimeField('Modified Date', auto_now=True)

    def __str__(self):
        return self.first_name
