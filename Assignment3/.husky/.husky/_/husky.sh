#!/bin/sh

# Überprüfen, ob das Projekt im richtigen Verzeichnis ausgeführt wird
if [ ! -f "package.json" ]; then
  echo "Fehler: Dieses Skript muss im Stammverzeichnis des Repositories ausgeführt werden."
  exit 1
fi

# Erstelle eine Windows-kompatible Version, falls Bash nicht verfügbar ist
if [ -n "$CI" ]; then
  # Wir befinden uns möglicherweise in einer CI-Umgebung, daher sollten wir keine weiteren Skripte ausführen.
  exit 0
fi

# Überprüfe, ob Git Bash oder WSL verwendet wird
if [ -z "$BASH" ] && [ -z "$WSLENV" ]; then
  echo "Windows-Umgebung erkannt, führe npm lint aus..."
  npm run lint
else
  echo "Unix-ähnliche Umgebung erkannt, führe npm lint aus..."
  npm run lint
fi
