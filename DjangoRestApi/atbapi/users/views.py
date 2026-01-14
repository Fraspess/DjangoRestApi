from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import RegisterSerializer, SetNewPasswordSerializer, UserSerializer, LoginSerializer, PasswordResetRequestSerializer
from rest_framework import parsers
from rest_framework_simplejwt.tokens import RefreshToken

from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .models import CustomUser
from django.contrib.auth.tokens import default_token_generator


class UserViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    # Create your views here.
    @action(detail=False, methods=['post'], url_path='register', serializer_class=RegisterSerializer)
    def register(self, request):

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path='login', serializer_class=LoginSerializer)
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = CustomUser.objects.filter(username=username)
            user = user.first()
            if not user:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            # if not user.exists():
            #     return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)

                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response({"detail" : "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
    
    @action(detail=False, methods=['post'], url_path='forgot-password',serializer_class=PasswordResetRequestSerializer)
    def password_reset_request(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Лист для відновлення паролю відправлено"}, 
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['post'], url_path='reset-password', serializer_class=SetNewPasswordSerializer)
    def password_reset_confirm(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = urlsafe_base64_decode(serializer.validated_data['uid']).decode()
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response({"detail": "Невірний uid"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, serializer.validated_data['token']):
            return Response({"detail": "Невірний або прострочений токен"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Пароль успішно змінено"}, status=status.HTTP_200_OK)


    
            


            

    # @action(detail=False,methods=['post'], url_path='forgot-password', serializer_class=ForgotPasswordSerializer)
    # def forgot_password(self,request):
    #     serializer = ForgotPasswordSerializer(data=request.data)
    #     if serializer.is_valid():
    #         email = serializer.validated_data.pop("email")
    #         user = CustomUser.objects.filter(email = email)
    #         if not user.exists():
    #             return Response({"detail": "If the email is registered, you will receive a password reset email."}, status=status.HTTP_200_OK)
            
    #         token = PasswordResetTokenGenerator().make_token(user.first())
    #         uid = urlsafe_base64_encode(force_bytes(user.first().pk))

    #         referer = request.META.get('HTTP_REFERER')
    #         url = f'{referer}reset-password?uid={uid}&token={token}'
    #         print(url)

    #         subject = "Greetings from Django"
    #         message = "Congratulations! You've successfully sent an email using Django. Click the link to reset your password: " + url
    #         recipient_list = [email] 
    #         try:
    #             send_mail(
    #             subject,
    #             message,
    #             settings.EMAIL_HOST_USER, 
    #             recipient_list,
    #             fail_silently=False, 
    #             )
    #             return Response(status=status.HTTP_200_OK)
    #         except Exception as ex:
    #             return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

    # @action(detail=False, methods=['post'], url_path='reset-password', serializer_class=ResetPasswordSerializer)
    # def reset_password(self, request):
    #     serializer = ResetPasswordSerializer(data = request.data)
    #     if serializer.is_valid():
    #         password = serializer.validated_data.get('password')    
    #         uid = serializer.validated_data.get('uid')
    #         token = serializer.validated_data.get('token')

    #         if not password or not uid or not token:
    #             return Response({"detail": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    #         user_id = force_str(urlsafe_base64_decode(uid))
    #         print(user_id)
    #         user = CustomUser.objects.filter(pk=user_id).first()

    #         if not user:
    #             return Response({"detail": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        
    #         if not PasswordResetTokenGenerator().check_token(user, token):
    #             return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        
    #         user.set_password(password)
    #         user.save()

    #         return Response({"detail": "Password reset successful"}, status=status.HTTP_200_OK)



                    
        

                
                    

                    