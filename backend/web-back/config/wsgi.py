"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
from os.path import dirname, join

from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), "secret/.env")
load_dotenv(dotenv_path=dotenv_path, override=True)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

application = get_wsgi_application()
