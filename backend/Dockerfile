FROM node:20-alpine

RUN apk add --no-cache wget curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]