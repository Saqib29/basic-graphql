FROM node:16.3.0-alpine3.13

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE ${PORT}

CMD [ "node", "server.js" ]

RUN echo '🐳 Docker build success!'