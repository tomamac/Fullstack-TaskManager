FROM node:latest

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["node", "index.js"]
