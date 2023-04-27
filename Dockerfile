FROM node:18-alpine as base

ARG PORT=3000

ENV NODE_ENV=dev

WORKDIR /app

COPY package* .

RUN npm install --omit=dev

FROM base as build

COPY *.js .

FROM build as final

EXPOSE $PORT

CMD ["npm", "run", "start"]