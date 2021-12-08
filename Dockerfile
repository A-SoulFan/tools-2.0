FROM node:17-alpine AS builder

RUN npm i -g pnpm

WORKDIR /work

COPY ./ /work

RUN pnpm install

ENV VITE_API_EMOJI=https://meme-api.asoulfan.com/  \
    VITE_API_CFJ=https://tools.asoulfan.com/api/cfj/  \
    VITE_API_RANDOMVIDEO=https://support-api.asoulfan.com/api/stroll/random  \
    VITE_API_RANDOMVIDEO_UPDATETIME=https://support-api.asoulfan.com/api/stroll/last-update-time    \
    VITE_API_DICT_SEARCH=https://tools.asoulfan.com/dict/v1/public/search  \
    VITE_API_DICT_CATEGORIES=https://tools.asoulfan.com/dict/v1/public/categories  \
    VITE_API_DICT_ENTRIES=https://tools.asoulfan.com/dict/v1/public/entries  \
    VITE_API_DUPLICATECHECKING=https://asoulcnki.asia/v1/api/check \

RUN pnpm build

FROM nginx:1.19.6-alpine

WORKDIR /work

COPY --from=builder /work/dist /usr/share/nginx/html
COPY --from=builder /work/default.conf /etc/nginx/conf.d/default.conf
