#!/usr/bin/env bash
# ==============================================================================
# Script de déploiement FTP / FTPS vers l'hébergement Infomaniak
# Usage:
#   FTP_SERVER="xxx.ftp.infomaniak.com" FTP_USER="user" FTP_PASS="pass" ./scripts/deploy-ftp.sh
# ==============================================================================

set -euo pipefail

FTP_SERVER="${FTP_SERVER:-}"
FTP_USER="${FTP_USER:-}"
FTP_PASS="${FTP_PASS:-}"
FTP_DIR="${FTP_DIR:-web/}"  # 'web/' ou 'sites/open-eidas.eu/' selon l'hébergement Infomaniak

if [[ -z "$FTP_SERVER" || -z "$FTP_USER" || -z "$FTP_PASS" ]]; then
  echo "Erreur : variables FTP manquantes."
  echo "Usage:"
  echo "  FTP_SERVER=\"<hote_ftp>\" FTP_USER=\"<utilisateur>\" FTP_PASS=\"<mot_de_passe>\" [FTP_DIR=\"web/\"] $0"
  exit 1
fi

echo "==> Déploiement du site vers Infomaniak (${FTP_SERVER}/${FTP_DIR})..."

# Fichiers et dossiers à téléverser
FILES_TO_UPLOAD=(
  "index.html"
  "style.css"
  ".htaccess"
)

for file in "${FILES_TO_UPLOAD[@]}"; do
  if [[ -f "$file" ]]; then
    echo " -> Téléversement de $file..."
    curl --silent --show-error --ssl-reqd \
         --user "${FTP_USER}:${FTP_PASS}" \
         --ftp-create-dirs \
         -T "$file" \
         "ftp://${FTP_SERVER}/${FTP_DIR}${file}"
  fi
done

# Téléversement des assets
if [[ -d "assets" ]]; then
  echo " -> Téléversement des assets SVG..."
  for asset in assets/*; do
    if [[ -f "$asset" ]]; then
      echo "    * $(basename "$asset")"
      curl --silent --show-error --ssl-reqd \
           --user "${FTP_USER}:${FTP_PASS}" \
           --ftp-create-dirs \
           -T "$asset" \
           "ftp://${FTP_SERVER}/${FTP_DIR}${asset}"
    fi
  done
fi

echo "==> Déploiement terminé avec succès !"
