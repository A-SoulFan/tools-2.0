FROM node:14.15.3 AS builder

WORKDIR /work

COPY ./ /work

RUN cp .env.example .env

RUN npm install

RUN npm build

FROM nginx:1.19.6-alpine

WORKDIR /work

COPY --from=builder /work/dist /usr/share/nginx/html·