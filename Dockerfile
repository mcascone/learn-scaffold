FROM node:alpine as base

ENV PORT=3000 \
  NODE_ENV=dev

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY *.js ./

EXPOSE $PORT

CMD ["npm", "run", "start"]
