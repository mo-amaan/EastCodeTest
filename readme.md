## Clone the Repository

## Generate the Prisma Client

```
npx prisma generate
```

## Build your Docker images

```
docker compose build
```

## Create PostgreSQL migrations and apply them

```
docker compose run app npx prisma migrate dev --name init
```

### Also - to run/apply migrations if necessary:

```
docker-compose run app npx prisma migrate deploy
```

## Boot up Docker containers

```
docker compose up
```

or

```
docker compose up -d
```

## Test API

Test API using the todo.http file.
