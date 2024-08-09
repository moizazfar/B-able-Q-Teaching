from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_student", "is_teacher"]


class RegisterSerializer(serializers.ModelSerializer):
    is_student = serializers.BooleanField(required=False)
    is_teacher = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = ["username", "email", "password", "is_student", "is_teacher"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        is_student = validated_data.pop("is_student", False)
        is_teacher = validated_data.pop("is_teacher", False)
        user = User.objects.create_user(**validated_data)

        if is_student:
            user.is_student = True
            Student.objects.create(
                user=user,
                username=user.username,
                email=user.email,
                password=user.password,
            )
        elif is_teacher:
            user.is_teacher = True
            Teacher.objects.create(
                user=user,
                username=user.username,
                email=user.email,
                password=user.password,
            )

        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ["username", "password", "access", "refresh"]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "user",
            "username",
            "password",
            "email",
            "father_name",
            "gender",
            "age",
            "profile_picture",
        ]
        read_only_fields = ["password", "user"]


class VideoProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoProgress
        fields = [
            "id",
            "student",
            "video_id",
            "completed",
            "alphabet_name",
            "assignment_type",
            "timestamp",
        ]

        read_only_fields = ["student"]


class StudentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProgress
        fields = "__all__"
        extra_kwargs = {"student": {"read_only": True}}
