from rest_framework import serializers
from .utils import compress_image
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 
            'username', 
            'email', 
            'phone',
            'first_name', 
            'last_name', 
            'image_small', 
            'image_medium', 
            'image_large'
        ]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    image = serializers.ImageField(write_only=True, required=False)  # лише одне поле для upload

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'image',
            'phone',
        ]

    def create(self, validated_data):
        image = validated_data.pop('image', None)
        user = CustomUser.objects.create_user(
            **validated_data
        )
        print(image)
        if image:
            # створюємо 3 розміри
            optimized, name = compress_image(image, size=(300, 300))
            user.image_small.save(name, optimized, save=False)

            optimized, name = compress_image(image, size=(800, 800))
            user.image_medium.save(name, optimized, save=False)

            optimized, name = compress_image(image, size=(1200, 1200))
            user.image_large.save(name, optimized, save=False)

            user.save()

        return user
    

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'password',
        ]

class ForgotPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta:
        model = CustomUser
        fields = [
            'email'
        ]


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    uid = serializers.CharField()
    token = serializers.CharField()
            

