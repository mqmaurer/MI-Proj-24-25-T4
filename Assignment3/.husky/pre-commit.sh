
#!/bin/sh
echo "Running pre-commit hook..."  # Debug-Nachricht

. "$(dirname "$0")/../../.husky/.husky/_/husky.sh"
npm run lint