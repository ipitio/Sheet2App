FROM node
WORKDIR /client
EXPOSE 3000
ADD package.json .
RUN npm i --legacy-peer-deps
ADD . .
ENV PATH=/client/node_modules/.bin:$PATH
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

ENV REACT_APP_OAUTH_CLIENT_ID=1043255060654-pg1vucmm5iibpt7qsvdmsq5khahnkak7.apps.googleusercontent.com

ENV REACT_APP_DJANGO_HOST=localhost
ENV REACT_APP_DJANGO_PORT=8000
ENV REACT_APP_DJANGO_PROTOCOL=http

CMD [ "npm", "start" ]
