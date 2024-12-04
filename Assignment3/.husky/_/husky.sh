#!/bin/sh

echo "Setting up Husky..."

# Ensure package.json exists and is in the expected location
if [ ! -f Assignment3/package.json ]; then
  echo "Error: package.json not found in the expected location."
  exit 1
fi

# Allow us to call other scripts via "npm run"
 export PATH="./node_modules/.bin:$PATH"

# # Ensure we have an git repository
if [ ! -d ".git" ]; then
  echo "Error: .git directory not found in the expected location."
  exit 1
fi

# Sets git hooks path to be in the Assignment3/.husky directory
git config core.hooksPath Assignment3/.husky

