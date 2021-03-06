
<p  align="center">
<a  href="http://nestjs.com/"  target="blank">
<img  src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Stone_pagamentos.png"  width="250"  alt="Logo da Stone" />
</a>
</p>
<p  align="center">Desafio técnico para vaga de Backend Developer NodeJS na Stone</p>


## Descrição

#### Customer API v.1.0.0  

<br> 

Uma uma RESTful API que suporta as seguintes operações:

- Salvar um cliente novo
- Atualizar um cliente existente
- Buscar um cliente por ID

<br> 

Utilizando:

- [Nest](https://github.com/nestjs/nest) framework.
- [Axios](https://axios-http.com/) Promise based HTTP client
- [Jest](https://jestjs.io/) JavaScript Testing Framework
- [Typescript](https://www.typescriptlang.org/) JavaScript Superset
- [Docker](https://www.docker.com/) images
- [Redis](https://redis.io/) in-memory data store

  
<br>

---

## Requisitos

- Docker
- Node.js v14+ (Desenvolvimento local sem Docker)

<br>

## Variaveis de ambiente
- **PORT**=Porta da api (default: 3000)
- **KEYCLOAK_HOST**=Url para realizar o introspect do token no SSO (Opcional, ja configurado no projeto)
- **SSO_CLIENT_SECRET**: Secret do cliente no servico de SSO
- **SSO_CLIENT_ID**: Id do cliente no servico de SSO  
- **REDIS_HOST**: Endereço do redis (default: localhost)
- **REDIS_PORT**: Porta do redis (default: 6379)
- **REDIS_PASSWORD**: Senha do redis (Opcional)

---

## Desenvolvendo o projeto com Docker

#### Clonar o repositório e acessar a pasta
  

```bash

$ git clone https://github.com/Zackynson/customer-api.git

$ cd customer-api

```

<br> 

#### Inicializar o projeto em modo de desenvolvimento

```bash

$ docker compose up

```

<br> 

#### Serão iniciados dois containers:

  

- A aplicação em si, baseada no arquivo `Dockerfile` na raiz do projeto rodando no endereço [http://localhost:3000](http://localhost:3000) 

- Banco de dados Redis um container baseado na [Imagem oficial do Redis](https://hub.docker.com/_/redis) rodando na porta 6379

<br> 

## Construindo imagem para produção

#### Gerando a imagem

```bash

$ docker build -t <nome_para_imagem>  .

```
<br> 


#### Rodando container com base na nova imagem

```bash

$ docker run -p <porta_localhost>:3000 <nome_da_imagem_gerada> -e <variaveis_ambiente>

```
  
<br>

---

<br>

## Desenvolvendo sem Docker

<br> 

**Importante**: é necessário ter um servidor Redis rodando local ou remotamente nesse caso e configurar as variáveis de ambiente através do arquivo `.env` na raiz do projeto.

<br> 

---

<br> 

### Clonar o repositório e acessar a pasta

```bash

$ git clone https://github.com/Zackynson/customer-api.git

$ cd customer-api  

```
<br> 

### Instalar as dependências

  

```bash

$ npm i -g @nestjs/cli

$ npm install

```
<br> 

### Rodar a aplicação em modo de desenvolvimento

```bash
$ npm run start:dev
```

  

A aplicação será iniciada e rodará no endereço [http://localhost:3000](http://localhost:3000)

<br> 
  
## Construindo para produção

<br> 

#### Gerando o código de produção
```bash

$ npm run build 

```
<br> 

#### Rodando no modo de produção
```bash

$ npm run start:prod

```

  
<br>

---

<br>

## Testando a aplicação

<br> 
  
**Os comandos abaixo podem ser executados tanto no ambiente local quanto dentro do container através de uma shell interativa ou via docker-compose**
  
#### Testes unitários
  
```bash

#ambiente local ou shell interativa
$ npm run test:unit

#ou via docker-compose
$ docker-compose run customer-api npm run test:unit

```

<br> 

##### Testes de integração

```bash

#ambiente local ou shell interativa
$ npm run test:integration

#ou via docker-compose
$ docker-compose run customer-api npm run test:integration

```

<br> 


#### Rodar todos os testes

```bash

#ambiente local ou shell interativa
$ npm run test

#ou via docker-compose
$ docker-compose run customer-api npm run test

```

#### Gerar relatório da cobertura de testes

```bash

#ambiente local ou shell interativa
$ npm run test:cov

#ou via docker-compose
$ docker-compose run customer-api npm run test:cov

```
---
<br>


## Documentação da API

Ao rodar a aplicação independentemente do ambiente (local/docker) a documentação das rotas fica disponivel no endpoint `/docs`, contendo exemplos de requisições para facilitar a integração com a api.

<br>

---

## Contato

#### Projeto criado por Crystopher Carvalho

- [Github](https://github.com/Zackynson)
- [Linkedin](https://www.linkedin.com/in/crystopher-carvalho/)
- [E-Mail](crys.chb@hotmail.com)

---
