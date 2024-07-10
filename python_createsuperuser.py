import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hangman.settings")
django.setup()

User = get_user_model()

if not User.objects.filter(username="root").exists():
    User.objects.create_superuser("root", "root@example.com", "password")
    print("Superuser created successfully.")
else:
    print("Superuser already exists.")
