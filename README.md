# Open eIDAS — Site Web Officiel

Dépôt du site vitrine d'**Open eIDAS** ([open-eidas.eu](https://open-eidas.eu)), hébergé chez **Infomaniak**.

---

## Structure du site

- `index.html` : Page d'accueil responsive (Dark/Light mode, feuille de route, présentation de la mission et point de contact officiel).
- `style.css` : Feuille de style moderne avec support natif `color-scheme` et variables CSS.
- `.htaccess` : Configuration Apache optimisée pour Infomaniak (redirection HTTPS, HSTS, en-têtes de sécurité, MIME types SVG et cache navigateur).
- `assets/` : Logos et favicons vectoriels SVG officiels.
- `scripts/deploy-ftp.sh` : Script de déploiement en ligne de commande vers Infomaniak via FTPS.
- `.github/workflows/ftp.yml` : Workflow de déploiement continu vers Infomaniak via GitHub Actions.

---

## Déploiement automatique vers Infomaniak (CI/CD)

Le déploiement est automatisé à chaque push sur la branche `main` via FTPS sécurisé.

### Secrets GitHub à configurer :
Dans votre dépôt GitHub, allez dans **Settings > Secrets and variables > Actions > New repository secret** :

| Secret | Description | Exemple Infomaniak |
|---|---|---|
| `FTP_SERVER` | Hôte du serveur FTP/FTPS | `xxx.ftp.infomaniak.com` |
| `FTP_USERNAME` | Identifiant du compte FTP | Votre utilisateur FTP |
| `FTP_PASSWORD` | Mot de passe du compte FTP | Votre mot de passe |

*Optionnel (Variable d'environnement ou Secret) :*
- `FTP_SERVER_DIR` : Répertoire cible sur l'hébergement (par défaut `web/` chez Infomaniak, ou `sites/open-eidas.eu/`).
- `FTP_PORT` : Port FTP (par défaut `21` pour FTPS explicite).

---

## Déploiement manuel local

Vous pouvez également déployer directement depuis votre machine avec le script fourni :

```bash
FTP_SERVER="xxx.ftp.infomaniak.com" \
FTP_USER="mon_utilisateur" \
FTP_PASS="mon_mot_de_passe" \
./scripts/deploy-ftp.sh
```

---

## Développement & Prévisualisation locale

```bash
# Avec Python 3
python3 -m http.server 8000
```
Puis ouvrir <http://localhost:8000>.

---

## Contact & Licence

- Contact : **contact@open-eidas.eu**
- Licence : **GNU Affero General Public License v3.0 (AGPLv3)** — voir [LICENSE](LICENSE).
