FROM node:14-bullseye as base
RUN apt-get update && apt-get upgrade -y
# RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV PORT=3000
ENV NODE_ENV=production
ENV USER=node
ENV OWNER='node:node'

FROM base as build
WORKDIR /app
COPY package*.json .
RUN npm install --only=production

FROM build as release
WORKDIR /app/node_modules
# COPY --from=base /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build --chown=$OWNER /app/node_modules .

WORKDIR /app
COPY --chown=$OWNER *.js ./

EXPOSE $PORT

USER $USER
CMD ["npm", "run", "start"]
# CMD ["dumb-init", "node", "index.js"]