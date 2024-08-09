from django.urls import path
from .views import *

urlpatterns = [
    path("recognize_sign/", recognize_sign, name="recognize_sign"),
    path("get-csrf-token/", get_csrf_token, name="get_csrf_token"),
]
