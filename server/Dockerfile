FROM python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /server
ADD . .
EXPOSE 8000
EXPOSE 8001
RUN pip3 install -r requirements.txt
RUN apt-get update && apt-get install -y netcat

ENV MYSQL_HOST=mysql
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=default-password
ENV MYSQL_PORT=3306
ENV MYSQL_DATABASE=Sheet2App

ENV OAUTH_CLIENT_ID=1043255060654-pg1vucmm5iibpt7qsvdmsq5khahnkak7.apps.googleusercontent.com
ENV OAUTH_CLIENT_SECRET=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
ENV CREDS_JSON=creds
ENV TOKEN_JSON=token

ENV GLOBAL_DEVELOPER_LIST_URL=https://docs.google.com/spreadsheets/d/1LxcOSWaAF_bdrXWIYH8e7Kc2KN5aOwDSlYcgqgerZFc/edit#gid=0

ENV REDIS_HOST=redis

ENV DJANGO_SUPERUSER_USERNAME=admin
ENV DJANGO_SUPERUSER_EMAIL=admin@local.host
ENV DJANGO_SUPERUSER_PASSWORD=password

ENV NODE_HOST=localhost
ENV NODE_PORT=3000
ENV NODE_PROTOCOL=http

CMD [ "bash", "./start.sh", "mysql" ]
