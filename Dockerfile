FROM node:10-alpine

RUN apk update && \
    apk add vim

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm ci

COPY ./frontend/package.json /app/frontend/package.json
COPY ./frontend/package-lock.json /app/frontend/package-lock.json

RUN cd ./frontend && npm ci

COPY ./server/package.json /app/server/package.json
COPY ./server/package-lock.json /app/server/package-lock.json

RUN cd ./server && npm ci

COPY ./frontend /app/frontend
COPY ./server /app/server

RUN adduser -h /home/devnotebook -D -s /bin/sh devnotebook && \
    chown -R devnotebook:devnotebook ./frontend/src && \
    chown -R devnotebook:devnotebook ./frontend/public && \
    chown -R devnotebook:devnotebook ./server/src

USER devnotebook

CMD ["npm", "run", "start:prod"]
