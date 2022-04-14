FROM node:16-alpine as customer-api

WORKDIR /app

# Copia os arquivos do npm
COPY package*.json ./

# Instala as dependencias
RUN npm i

# Copia os arquivos do codigo para a imagem
COPY . .

# Instala as dependencias
RUN npm run build

