FROM node:14-alpine as customer-api

WORKDIR /usr/src/app

# Copia os arquivos do npm
COPY package*.json ./

# Copia os arquivos do codigo para a imagem
COPY . .


# Instala as dependencias
RUN npm i -g @nestjs/cli

RUN npm install

RUN npm link webpack

# constroi o código de produção
RUN npm run build

CMD [ "npm", "run", "start:prod" ]