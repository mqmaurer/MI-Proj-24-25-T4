#!/bin/sh
# husky.sh - Helper file to set up hooks in Husky

# Ensure this script is run from the root of the repository
if [ ! -f Assignment3/package.json ]; then
  echo "Error: this script must be run from the root of the repository."
  exit 1
fi

# Allow us to call other scripts via "npm run"
export PATH="./node_modules/.bin:$PATH"

# If the .git directory is in the parent folder, make sure to set the correct hooks path
if [ ! -d ".git" ]; then
  echo "Error: .git directory not found in the expected location."
  exit 1
fi

# Uncomment to enable Git hooks for this repo (if it's not already set in Git config)
# git config core.hooksPath ./Assignment3/.husky
