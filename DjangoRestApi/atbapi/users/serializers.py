from .models import CustomUser
from rest_framework import serializers
from .utils import compress_image
class UserRegisterSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True, write_only=True)
    password = serializers.CharField(write_only = True)
    class Meta:
        model = CustomUser
        fields = ('id', 'password', 'email','phone','image', 'username')

    def create(self,validated_data):
        original_image = validated_data.pop('image', None)
        user = CustomUser.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
        )
        if original_image:
            optimized_image, image_name = compress_image(original_image, size=(300,300))
            user.image_small.save(image_name, optimized_image, save=False)
            optimized_image, image_name = compress_image(original_image, size=(800,800))
            user.image_medium.save(image_name, optimized_image, save=False)
            optimized_image, image_name = compress_image(original_image, size=(1200,1200))
            user.image_large.save(image_name, optimized_image, save=False)
        user.save()
        return user