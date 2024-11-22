FROM node:18-alpine

WORKDIR /var/www

COPY package*.json ./

COPY . .

RUN npm install -g npm@latest

RUN npm install -g @nestjs/cli

EXPOSE 8090