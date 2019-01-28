FROM node:10-alpine

RUN apk update && \
    apk add vim

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm ci

COPY . /app

RUN adduser -h /home/devnotebook -D -s /bin/sh devnotebook

USER devnotebook

CMD ["npm", "run", "start:prod"]
