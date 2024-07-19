import os
from os.path import join

from dotenv import load_dotenv

from .base import *  # noqa:F403

dotenv_path = join(BASE_DIR, "/config/secret/.env")  # noqa:F405
load_dotenv(dotenv_path=dotenv_path)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ["SECRET_KEY"]
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = os.environ["ALLOWED_HOSTS"].split(",")
# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.environ["DB_ENGINE"],
        "NAME": os.environ["DB_NAME"],
        "USER": os.environ["DB_USER"],
        "PASSWORD": os.environ["DB_PASSWORD"],
        "HOST": os.environ["DB_HOST"],
        "PORT": os.environ["DB_PORT"],
        "OPTIONS": {
            "sslmode": "require",
        },
    }
}

# 静的ファイルを配信するURL
STATIC_URL = "/static/"

# 本番環境で静的ファイルを参照する先
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")  # 追加  # noqa:F405

# 追加
# Email Backend Configuration
EMAIL_BACKEND = (
    "django.core.mail.backends.smtp.EmailBackend"  # Replace with your preferred backend
)
EMAIL_PORT = os.environ["EMAIL_PORT"]  # Replace with your email port
EMAIL_USE_TLS = True  # Set to False if your email server doesn't use TLS
# Replace with your email host for gmail -> 'smtp.gmail.com'
EMAIL_HOST = os.environ["EMAIL_HOST"]
EMAIL_HOST_USER = os.environ["EMAIL_HOST_USER"]  # Replace with your email username
# Replace with your email password
EMAIL_HOST_PASSWORD = os.environ["EMAIL_HOST_PASSWORD"]

# 追加
CORS_ALLOWED_ORIGINS = os.environ["CORS_ALLOWED_ORIGINS"].split(",")
CSRF_TRUSTED_ORIGINS = os.environ["CSRF_TRUSTED_ORIGINS"].split(",")
