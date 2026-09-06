# Open eIDAS — Site Web Officiel

Dépôt du site vitrine d'**Open eIDAS** ([open-eidas.eu](https://open-eidas.eu)), l'infrastructure ouverte de services de confiance qualifiés européens.

## Contenu

- `index.html` : Page d'accueil responsive avec présentation de la vision, du premier service (horodatage RFC 3161), de la feuille de route et du point de contact officiel.
- `style.css` : Feuille de style moderne supportant nativement les modes clair et sombre (`color-scheme`).
- `assets/` : Déclinaisons officielles du logo et favicons vectoriels SVG.
- `CNAME` : Configuration du domaine personnalisé `open-eidas.eu`.
- `.github/workflows/deploy.yml` : Déploiement automatisé sur GitHub Pages via GitHub Actions.

## Contact

Pour toute demande, partenariat ou contribution à l'initiative :
**contact@open-eidas.eu**

## Développement local

Pour prévisualiser le site localement :

```bash
# Avec Python 3
python3 -m http.server 8000

# Avec Node.js
npx serve .
```

Puis ouvrir <http://localhost:8000> dans votre navigateur.

## Licence

Distribué sous licence **GNU Affero General Public License v3.0 (AGPLv3)**.
