FROM node:22.2-alpine AS build

WORKDIR /

COPY package*.json /

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
