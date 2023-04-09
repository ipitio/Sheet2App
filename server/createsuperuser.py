from django.db import IntegrityError
from django.contrib.auth import get_user_model
from dotenv import load_dotenv
import os

load_dotenv()
username=os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
email=os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@local.host')
password=os.getenv('DJANGO_SUPERUSER_PASSWORD', 'password')

User = get_user_model()
try:
    User.objects.create_superuser(username, email, password)
except IntegrityError:
    pass
except Exception as e:
    print(e)
