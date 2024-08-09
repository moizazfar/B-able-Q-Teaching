from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import User, Student, Teacher, StudentProgress, VideoProgress
from django.core.mail import send_mail
from .forms import ContactForm
import json
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    StudentSerializer,
    StudentProgressSerializer,
    MyTokenObtainPairSerializer,
    VideoProgressSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserDetailView(APIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class StudentViewSet(viewsets.ModelViewSet):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        student = request.user.student
        serializer = self.get_serializer(student)
        return Response(serializer.data)

    @action(detail=False, methods=["put"])
    def update_profile(self, request):
        student = request.user.student
        serializer = self.get_serializer(student, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StudentProgressViewSet(viewsets.ModelViewSet):
    queryset = StudentProgress.objects.all()
    serializer_class = StudentProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        student = request.user.student
        queryset = StudentProgress.objects.filter(student=student)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = request.user.student
        student_progress = serializer.save(student=student)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        student = request.user.student
        queryset = StudentProgress.objects.filter(student=student)
        student_progress = get_object_or_404(queryset, pk=kwargs["pk"])
        serializer = self.get_serializer(student_progress)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        student = request.user.student
        instance = get_object_or_404(
            StudentProgress.objects.filter(student=student), pk=kwargs["pk"]
        )
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        student = request.user.student
        instance = get_object_or_404(
            StudentProgress.objects.filter(student=student), pk=kwargs["pk"]
        )
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VideoProgressViewSet(viewsets.ModelViewSet):
    queryset = VideoProgress.objects.all()
    serializer_class = VideoProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        student = request.user.student
        queryset = VideoProgress.objects.filter(student=student)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = request.user.student
        video_progress = serializer.save(student=student)
        return Response(serializer.data)


@csrf_exempt
def contact_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        subject = data.get("subject")
        message = data.get("message")

        
        full_message = (
            f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}"
        )
        send_mail(
            subject,
            full_message,
            email,  
            ["bableqteaching2024@gmail.com"],
            fail_silently=False,
        )
        return JsonResponse({"message": "Email sent successfully"}, status=200)
    return JsonResponse({"error": "Invalid request"}, status=400)
