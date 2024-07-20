#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
from glob import glob
from os.path import dirname, join

from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), "config/secret/.env")
print(dotenv_path)
print(glob("/code/**/.env", recursive=True))
print(load_dotenv(dotenv_path=dotenv_path))


def main():
    print(os.environ["DJANGO_SETTINGS_MODULE"])
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.devlopment")
    print(os.environ["DJANGO_SETTINGS_MODULE"])
    # try:
    #     from django.core.management import execute_from_command_line
    # except ImportError as exc:
    #     raise ImportError(
    #         "Couldn't import Django. Are you sure it's installed and "
    #         "available on your PYTHONPATH environment variable? Did you "
    #         "forget to activate a virtual environment?"
    #     ) from exc
    # execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
