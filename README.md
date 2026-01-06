# URL Shortener

## Lancement du projet

```bash
docker-compose up
```

Les services seront disponibles à :
- **Frontend** : http://localhost:3001
- **Backend API** : http://localhost:3000
- **Adminer** : http://localhost:8080
  - Système : PostgreSQL
  - Serveur : postgres
  - Utilisateur : postgres
  - Mot de passe : postgres123
  - Base de données : shortener_db


## Tester l'application

1. Ouvrez le frontend : http://localhost:3001
2. Entrez une URL longue
3. Cliquez sur "Générer URL"
4. Copiez l'URL raccourcie générée (ex: `http://localhost:3000/r/abc123`)
5. Visitez cette URL dans un nouvel onglet. Vous serez redirigé vers l'URL originale