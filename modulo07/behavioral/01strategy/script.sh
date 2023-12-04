docker run \
    --name postgres \
    -e POSTGRES_USER=leo \
    -e POSTGRES_PASSWORD="senha0001" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
    docker exec -it postgres psql --username leo --dbname heroes
    CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);
    SELECT * FROM warriors;

    #mongo
    docker run \
        --name mongodb \
        -e MONGO_INITDB_ROOT_USERNAME=leo \
        -e MONGO_INITDB_ROOT_PASSWORD=senha0002 \
        -p 27017:27017 \
        -d \
        mongo:4