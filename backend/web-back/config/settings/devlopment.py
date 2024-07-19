import os

from .base import *  # noqa:F403

DEBUG = True
SECRET_KEY = "wq)cz6vr6!9&yfb%&))$42!_bc)m)o!*e)%+oe(wyy(loh8b_r"
ALLOWED_HOSTS = ["*"]
# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "paidholidaysList",
        "USER": "user",
        "PASSWORD": "password",
        "HOST": "db",
        "PORT": "5432",
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

# 静的ファイルを配信するURL
STATIC_URL = "/static/"

# 開発環境で静的ファイルを参照する先
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]  # 追加  # noqa:F405

# メディアファイルのパス
MEDIA_URL = "/media/"  # 追加

# 指定しないとベースディレクトリにアップロードされるので、設定
MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # 追加  # noqa:F405

# 追加
# Email Backend Configuration
EMAIL_BACKEND = (
    "django.core.mail.backends.smtp.EmailBackend"  # Replace with your preferred backend
)
EMAIL_PORT = 587  # Replace with your email port
EMAIL_USE_TLS = True  # Set to False if your email server doesn't use TLS
# Replace with your email host for gmail -> 'smtp.gmail.com'
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "alive.vb.s2@gmail.com"  # Replace with your email username
# Replace with your email password
EMAIL_HOST_PASSWORD = "cdxeyllljqklukrc"

# 追加
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
]
