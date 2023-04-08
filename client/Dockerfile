FROM node
WORKDIR /client
ADD . ./
EXPOSE 3000
RUN npm i --legacy-peer-deps
ENV PATH=/client/node_modules/.bin:$PATH

#ENV REACT_APP_OAUTH_CLIENT_ID=1043255060654-pg1vucmm5iibpt7qsvdmsq5khahnkak7.apps.googleusercontent.com

CMD [ "npm", "start" ]
