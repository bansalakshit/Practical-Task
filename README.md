# Getting started

## Postgres Setup
  - [Install postgres](https://www.postgresql.org/download/)
  - Open postgres shell
  - Run commands
      ```bash
        CREATE DATABASE {database-name}
        CREATE USER {username} WITH PASSWORD {password-name}
      ```
  - Add your database, username and password in .development.env file

## Project Setup
```bash
  yarn
  yarn start:dev
```

## Swagger Url
  - http://localhost:3000/swagger

## Deployment
  - Generate build files for all the microservices and api-gateway
    ```
      npm run build (or) yarn build
    ```
  - Start pm2 pointing to dist/main.js
    ```
      pm2 start dist/main.js
    ```