from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    age = models.IntegerField(null=True)
    profile_picture = models.ImageField(
        upload_to="profile_pics/", blank=True, null=True
    )

    def __str__(self):
        return f"{self.username}"


class StudentProgress(models.Model):
    ASSIGNMENT_TYPES = (
        ("Mufradat", "Huroof Al-Mufradat"),
        ("Murakkabat", "Huroof Al-Murakkabat"),
        ("Murqattaat", "Huroof Al-Murqattaat"),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    assignment_type = models.CharField(max_length=20, choices=ASSIGNMENT_TYPES)
    completed_assignments = models.IntegerField(default=0)
    last_completed_huroof = models.CharField(max_length=10, blank=True, null=True)
    marks_obtained = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username}'s {self.assignment_type} Progress"


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)


class VideoProgress(models.Model):
    ASSIGNMENT_TYPES = (
        ("Mufradat", "Huroof Al-Mufradat"),
        ("Murakkabat", "Huroof Al-Murakkabat"),
        ("Murqattaat", "Huroof Al-Murqattaat"),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    video_id = models.IntegerField()
    completed = models.BooleanField(default=False)
    alphabet_name = models.CharField(max_length=100)
    assignment_type = models.CharField(max_length=20, choices=ASSIGNMENT_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.alphabet_name} ({self.video_id})"
