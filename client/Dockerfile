FROM node
WORKDIR /client
ADD . ./
EXPOSE 3000
RUN npm i --legacy-peer-deps
ENV PATH=/client/node_modules/.bin:$PATH
ENV REACT_APP_OAUTH_CLIENT_ID=407295301845-ebhdauv107hhr05do0c21p63tnglmj6s.apps.googleusercontent.com
CMD [ "npm", "start" ]
