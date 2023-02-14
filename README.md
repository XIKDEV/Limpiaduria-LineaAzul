<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Rest api

## Installation

1. Install all dependencies

```
yarn install
```

2. Build the container with database, comment the container you don't need `app - Rest; front - Front; db - DataBase`

```
docker compose up -d
```

3. Create environment file `.env`

| Variable     | Value                                     | Description                                                 |
| ------------ | ----------------------------------------- | ----------------------------------------------------------- |
| PORT         | 3000                                      | Port that the server listens on                             |
| HOST_BD      | localhost                                 | Host to connect database                                    |
| PORT_BD      | 5432                                      | Port to connect database                                    |
| USER_BD      | postgres                                  | User to connect database                                    |
| PASSWORD_BD  |                                           | Password to connect database, developer select the password |
| BD_NAME      | NameDB                                    | Database name to connect database                           |
| STAGE        | dev                                       | Stage you want to run the app                               |
| IMAGE_DOCKER | alderickrios/limpiaduria_linea_azul:2.0.1 | Image to run the api with docker                            |

## Running the app

```bash

# watch mode
$ yarn run start:dev

```

## Docker Image

`Dockerfile` is the config to create and deploy on docker hub an image with the api

You can run the next command; we use buildx to build with different OS/ARCH:

1. Create an profile with buildx

```
docker buildx create --name mybuilder --driver docker-container --bootstrap
```

2. Build the image

```
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t <username>/<image>:latest --push .
```
