from django.shortcuts import render
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import io
from django.middleware.csrf import get_token
from django.http import JsonResponse
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import random


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})


def recognize_sign_api(image):
    prediction_letter = "ALIF"
    confidence_score = random.randint(50, 100)
    return prediction_letter, confidence_score


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def recognize_sign(request):
    image = request.FILES.get("image")
    prediction_letter, confidence_score = recognize_sign_api(image)
    return JsonResponse(
        {"prediction_letter": prediction_letter, "confidence_score": confidence_score}
    )


model = tf.keras.models.load_model("signrecognition/ArASL-BestModel.hdf5")


# @api_view(["POST"])
# def recognize_sign(request):
#     try:
#         serializer = ImageUploadSerializer(data=request.data)
#         if serializer.is_valid():
#             image = serializer.validated_data["image"]
#             img = cv2.imdecode(
#                 np.fromstring(image.read(), np.uint8), cv2.IMREAD_GRAYSCALE
#             )
#             img = cv2.resize(img, (64, 64))
#             img = img.reshape(1, 64, 64, 1) / 255.0

#             prediction = model.predict(img)
#             predicted_class = np.argmax(prediction, axis=1)

#             return Response(
#                 {
#                     "prediction_letter": str(predicted_class[0]),
#                     "confidence_score": float(np.max(prediction)),
#                 }
#             )
#         else:
#             return Response(serializer.errors, status=400)

#     except Exception as e:
#         return Response({"error": str(e)}, status=500)
