#!/bin/bash
set -e

# Store the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Ensure we're on master branch
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "Please run this script from master branch"
    exit 1
fi

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "Working directory is not clean. Please commit or stash changes first."
    exit 1
fi

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")

# Build the project
echo "Building project..."
export NODE_OPTIONS=--openssl-legacy-provider
npm run build

# Create temp directory for dist files
echo "Preparing dist files..."
mkdir -p temp_dist
cp dist/* temp_dist/
cp package.json temp_dist/
cp README.md temp_dist/

# Switch to dist branch
echo "Switching to dist branch..."
git checkout dist

# Remove old dist files
rm -rf dist/*

# Copy new dist files
mv temp_dist/* .
rmdir temp_dist

# Commit and tag
echo "Committing dist files..."
git add -A
git commit -m "chore: update dist files for v${VERSION}"
git tag -a "v${VERSION}" -m "Release version ${VERSION}"

# Switch back to master
echo "Switching back to master..."
git checkout "$CURRENT_BRANCH"

echo "Done! Don't forget to:"
echo "1. Push master branch: git push origin master"
echo "2. Push dist branch: git push origin dist"
echo "3. Push tags: git push --tags"
