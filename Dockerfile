FROM node:22.2-alpine AS build

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]
