from rest_framework.response import Response
from rest_fraemwork.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Customer
from .serializers import CustomerSerializer