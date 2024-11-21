### instalaçao docker

```
    docker rm -f nodejs
    docker compose build --no-cache
    docker compose up -d 
```

### Rodar migrations do prisma

```
    docker exec nodejs npx prisma migrate deploy
```
### instalaçao isolada postgres

```
    docker rm -postgres
    docker compose -f "postgres.yml" up -d 
```

habilitar distancematrix api no google cloud
