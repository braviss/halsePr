from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, UserProfileView, CreateTemporaryUserView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserProfileView.as_view(), name='user_profile'),
    path('create_temporary_user/', CreateTemporaryUserView.as_view(), name='create_temporary_user'),
]
