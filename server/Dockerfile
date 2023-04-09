FROM python
WORKDIR /server
ADD . ./
EXPOSE 8000
RUN pip3 install -r requirements.txt
RUN apt-get update && apt-get install -y netcat

ENV host=mysql
ENV user=root
ENV password=default-password
ENV port=3306
ENV database=Sheet2App

ENV CLIENT_ID=1043255060654-pg1vucmm5iibpt7qsvdmsq5khahnkak7.apps.googleusercontent.com
ENV CLIENT_SECRET=****

ENV cache=redis

ENV DJANGO_SUPERUSER_USERNAME=admin
ENV DJANGO_SUPERUSER_EMAIL=admin@local.host
ENV DJANGO_SUPERUSER_PASSWORD=password

CMD [ "bash", "./start.sh", "mysql" ]
