#!/bin/bash

# Wait for MySQL to be ready
DB_HOST=${1:-localhost}
DB_PORT=${2:-3306}
until nc -z -v -w30 $DB_HOST $DB_PORT; do
 echo 'Waiting for MySQL...'
 sleep 1
done
echo "MySQL is up."

python3 manage.py makemigrations --noinput --merge
python3 manage.py makemigrations --noinput
python3 manage.py migrate

python3 manage.py collectstatic --no-input
python3 manage.py shell < createsuperuser.py
python3 manage.py runserver 0.0.0.0:8000
