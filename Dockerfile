FROM node:6.4.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm install -g mocha && npm install && npm run build

EXPOSE 3000