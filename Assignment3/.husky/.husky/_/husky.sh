#!/bin/sh
# husky.sh - Helper file to set up hooks in Husky
# Taken from https://github.com/typicode/husky/blob/master/_/husky.sh

# Ensure this script is run from the root of the repository
if [ ! -f package.json ]; then
  echo "Error: this script must be run from the root of the repository."
  exit 1
fi

# Allow us to call other scripts via "npm run"
export PATH="./node_modules/.bin:$PATH"

# Uncomment to enable Git hooks for this repo
# git config core.hooksPath .husky

