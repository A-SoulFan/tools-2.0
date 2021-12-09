FROM node:17-alpine AS builder

RUN npm i -g pnpm

WORKDIR /work

COPY ./ /work

RUN pnpm install

ENV VITE_API_EMOJI="https://api.asoulfan.com/meme/" \
    VITE_API_CFJ="https://api.asoulfan.com/cfj/"      \
    VITE_API_RANDOMVIDEO="https://api.asoulfan.com/support/api/stroll/random"     \
    VITE_API_RANDOMVIDEO_UPDATETIME="https://api.asoulfan.com/support/api/stroll/last-update-time"    \
    VITE_API_DICT_SEARCH="https://api.asoulfan.com/dict/api/v1/public/search"     \
    VITE_API_DICT_CATEGORIES="https://api.asoulfan.com/dict/api/v1/public/categories"     \
    VITE_API_DICT_ENTRIES="https://api.asoulfan.com/dict/api/v1/public/entries"       \
    VITE_API_DUPLICATECHECKING="https://asoulcnki.asia/v1/api/check"    

RUN pnpm build

FROM nginx:1.19.6-alpine

WORKDIR /work

COPY --from=builder /work/dist /usr/share/nginx/html
COPY --from=builder /work/default.conf /etc/nginx/conf.d/default.conf
