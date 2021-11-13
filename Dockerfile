FROM node:17-alpine AS builder

WORKDIR /work

COPY ./ /work

ENV VITE_API_EMOJI=https://tools-demo.asoulfan.com/api/emoji  \
    VITE_API_CFJ=https://tools-demo.asoulfan.com/cfj/  \
    VITE_API_RANDOMVIDEO=https://support-api.asoulfan.com/api/stroll/random  \
    VITE_API_DICT_SEARCH=https://tools-demo.asoulfan.com/dict/v1/public/search  \
    VITE_API_DICT_CATEGORIES=https://tools-demo.asoulfan.com/dict/v1/public/categories  \
    VITE_API_DICT_ENTRIES=https://tools-demo.asoulfan.com/dict/v1/public/entries  \
    VITE_API_DUPLICATECHECKING=https://asoulcnki.asia/v1/api/check 

RUN npm i -g pnpm

RUN pnpm install

RUN pnpm build

FROM nginx:1.19.6-alpine

WORKDIR /work

COPY --from=builder /work/dist /usr/share/nginx/html
COPY --from=builder /work/default.conf /etc/nginx/conf.d/default.conf