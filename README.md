# Swapi Serverless Api
This an example about serverless with NodeJS.

## Create an starship

```sh
curl -X POST 'https://owwne19le4.execute-api.us-east-2.amazonaws.com/dev/starships' \
-H 'Content-Type: application/json' \
-d '{
    "nombre": "Death Star",
    "modelo": "DS-1 Orbital Battle Station",
    "fabricante": "Imperial Department of Military Research, Sienar Fleet Systems",
    "costoEnCreditos": "1000000000000",
    "longitud": "120000",
    "tripulacion": "342953",
    "pasajeros": "843342",
    "capacidadCarga": "1000000000000",
    "consumibles": "3 years",
    "pilotos": [],
    "peliculas": [
        "https://swapi.py4e.com/api/films/1/"
    ],
    "url": "https://swapi.py4e.com/api/starships/9/"
}'
```

## List starships

```sh
curl https://owwne19le4.execute-api.us-east-2.amazonaws.com/dev/starships
```
