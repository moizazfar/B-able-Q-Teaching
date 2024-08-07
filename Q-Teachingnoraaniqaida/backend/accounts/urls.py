# urls.py

from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    UserDetailView,
    LogoutView,
    MyTokenObtainPairView,
    VideoProgressViewSet,
    StudentProgressViewSet,
    StudentViewSet,
    contact_view,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

router = DefaultRouter()
router.register(r"video-progress", VideoProgressViewSet)
router.register(r"student-progress", StudentProgressViewSet)
router.register(r"student-details", StudentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("contact/", contact_view, name="contact"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("logout/", LogoutView.as_view(), name="auth_logout"),
    path("user/", UserDetailView.as_view(), name="user_detail"),
]
