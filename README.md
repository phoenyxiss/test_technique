# Test technique

Laureline Partonnaud

## Prérequis 

La base de donnée a été dockerisé. Le fichier compose est à la racine du projet. Il est composé d'une base de donné postgresql et d'une interface d'administration, adminer.

Le fichier `DB.sql` permet de créer la base de donnée, ce fichier peut etre importé dans adminer. (Disponible sur `http://localhost:8080/` avec le docker ouvert)

Les logiciels suivants sont nécessaires:
* Laravel
* nodejs
* npm
* postgresql (disponible avec le docker)

Dans le dossier ./nextjs, il faut effectuer la commande `npm ci` ou `npm install` pour installer les dépendances du projet (nextjs, etc) 

Les variables d'environnement suivantes sont à définir dans le `.env` à la racine du projet:
* APP_URL=http://localhost:8000
* FRONTEND_URL=http://localhost:3000
* DB_CONNECTION=pgsql
* DB_HOST=127.0.0.1
* DB_PORT=5432
* DB_DATABASE=Test_technique
* DB_USERNAME=postgres
* DB_PASSWORD=root

Les variables d'environnement suivantes sont à définir dans le `.env` dans ./nextjs:
* NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
* API_URL=http://localhost:8000/api

## Lancement du projet

```bash
docker compose up
php artisan serve
cd ./nextjs && npm run dev
``` 

L'application sera disponible sur `http://localhost:3000` 