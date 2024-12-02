#!/bin/sh
# Check if on Windows and call .bat file
if [ "$(uname -s)" = "MINGW32_NT" ] || [ "$(uname -s)" = "MINGW64_NT" ]; then
  .husky/pre-commit.bat
else
  . "$(dirname "$0")/_/husky.sh"
  npm run lint
fi
