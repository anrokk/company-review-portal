FROM node:20-alpine

RUN apk add --no-cache wget curl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]