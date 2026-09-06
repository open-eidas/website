#!/usr/bin/env bash
# ==============================================================================
# Script de déploiement FTP / FTPS vers l'hébergement Infomaniak
# ==============================================================================

set -euo pipefail

FTP_SERVER="${FTP_SERVER:-h2park-8d750cc5.infomaniak.ch}"
FTP_USER="${FTP_USER:-eo6l7r_github}"
FTP_PASS="${FTP_PASS:-$(cat /tmp/password | tr -d '\r\n')}"
FTP_DIR="${FTP_DIR:-}"  # Racine du compte FTP

echo "==> Déploiement du site vers Infomaniak (${FTP_SERVER}/${FTP_DIR})..."

FILES_TO_UPLOAD=(
  "index.html"
  "style.css"
  ".htaccess"
)

for file in "${FILES_TO_UPLOAD[@]}"; do
  if [[ -f "$file" ]]; then
    echo " -> Téléversement de $file..."
    curl --silent --show-error --ssl --insecure \
         --user "${FTP_USER}:${FTP_PASS}" \
         --ftp-create-dirs \
         -T "$file" \
         "ftp://${FTP_SERVER}/${FTP_DIR}${file}"
  fi
done

if [[ -d "assets" ]]; then
  echo " -> Téléversement des assets..."
  for asset in assets/*; do
    if [[ -f "$asset" ]]; then
      echo "    * $(basename "$asset")"
      curl --silent --show-error --ssl --insecure \
           --user "${FTP_USER}:${FTP_PASS}" \
           --ftp-create-dirs \
           -T "$asset" \
           "ftp://${FTP_SERVER}/${FTP_DIR}${asset}"
    fi
  done
fi

echo "==> Déploiement terminé avec succès sur Infomaniak !"
