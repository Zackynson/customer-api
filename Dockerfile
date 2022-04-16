FROM node:16-alpine as customer-api

WORKDIR /usr/src/app

# Copia os arquivos do npm
COPY package*.json ./

# Instala as dependencias
RUN npm install

RUN npm i -g @nestjs/cli

# Copia os arquivos do codigo para a imagem
COPY . .

# Instala as dependencias
RUN npm run build

CMD [ "npm", "run", "start:prod" ]