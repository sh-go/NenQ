from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieHandlerJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIE.get("access_token")

        if not access_token:
            Response({"message": "No token"})
        else:
            Response(access_token)
            request.META["HTTP_AUTHORIZATION"] = "{header_type} {access_token}".format(
                header_type=settings.SIMPLE_JWT["AUTH_HEADER_TYPES"][0],
                access_token=access_token,
            )
        return super().authenticate(request)
