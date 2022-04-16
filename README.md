<p  align="center">
	<a  href="http://nestjs.com/"  target="blank">
		<img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Stone_pagamentos.png"  width="250"  alt="Logo da Stone" />
	</a></p>

<p  align="center">Desafio técnico para vaga de Backend Developer NodeJS na Stone</p>


## Descrição

#### Customer API v.1.0.0

Uma uma RESTful API que suporta as seguintes operações:

- Salvar um cliente novo
- Atualizar um cliente existente
- Buscar um cliente por ID

Utilizando:
- [Nest](https://github.com/nestjs/nest) framework.
- [Axios](https://axios-http.com/) Promise based HTTP client
- [Jest](https://jestjs.io/) JavaScript Testing Framework
- [Typescript](https://www.typescriptlang.org/) JavaScript Superset
- [Docker](https://www.docker.com/) images
- [Redis](https://redis.io/) in-memory data store

## Requisitos

- Docker
- NodeJs v14+ (Desenvolvimento local sem Docker)
  
## Desenvolvendo o projeto com Docker
#### Clonar o repositório e acessar a pasta

```bash
$ git clone https://github.com/Zackynson/customer-api.git
$ cd customer-api
```

#### Inicializar o projeto em modo de desenvolvimento
```bash
$ docker compose up
```

#### Serão iniciados dois containers:

- A aplicação em si, baseada no arquivo `Dockerfile` na raiz do projeto rodando no endereço [http://localhost:4000](http://localhost:4000)

- Banco de dados Redis um container baseado na [Imagem oficial do Redis](https://hub.docker.com/_/redis) rodando na porta 6379

## Desenvolvendo sem Docker

#### Clonar o repositório e acessar a pasta

```bash

$ git clone https://github.com/Zackynson/customer-api.git
$ cd customer-api

```
  
#### Instalar as dependências

```bash

$ npm i -g @nestjs/cli

$ npm install 


```

#### Configurar variáveis de ambiente (Opcional)

- **REDIS_HOST**: Endereço do redis (default: localhost)

- **REDIS_PORT**: Porta do redis (default: 6379)

- **REDIS_PASSWORD**: Senha do redis (Opcional)

#### Rodar a aplicação em modo de desenvolvimento

```bash

$ npm run start:dev

```

A aplicação será iniciada e rodará no endereço [http://localhost:4000](http://localhost:4000)

**Importante**: é necessário ter um servidor Redis rodando local ou remotamente nesse caso e configurar as variáveis de ambiente caso nao estejam no endereço padrão de localhost.

## Construindo para produção com docker

#### Gerando a imagem
 
```bash

$ docker build -t <nome_para_imagem> . 

```

#### Rodando container com base na nova imagem
 
```bash

$ docker run -p <porta_localhost>:4000 <nome_da_imagem_gerada> -e <variaveis_ambiente>

```

## Testando a aplicação

#### Testes unitários

```bash

$ npm run test:unit

```
  

##### Testes de integração

```bash

$ npm run test:integration

```


  
#### Gerar relatório da cobertura de testes

```bash

$ npm run test:cov

```

## Contato

- Author - [Crystopher Carvalho](https://github.com/Zackynson)

## Licença
 
Esse projeto não é licenciado
