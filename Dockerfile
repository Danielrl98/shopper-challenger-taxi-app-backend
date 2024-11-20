FROM node:20-alpine

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 8070

EXPOSE 5432

CMD ["npm", "run", "start"]