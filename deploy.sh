#!/bin/bash

USER=
SCRIPT_PATH=
BASE_PATH=

# Find bin directory path for global npm packages using 'npm config get prefix'
PATH=$PATH:/home/$USER/.nvm/versions/node/lts/bin

# Stop portfolio service
pm2 delete nextjs-portfolio && pm2 save -f

# Copy database file if exists
if [ -f "$BASE_PATH/prisma/db.sqlite" ]; then
  cp -f "$BASE_PATH/prisma/db.sqlite" "$SCRIPT_PATH/db.sqlite"
fi

# Copy .env file if exists
if [ -f "$BASE_PATH/.env" ]; then
  cp -f "$BASE_PATH/.env" "$SCRIPT_PATH/.env"
fi

# Copy config app file if exists
if [ -f "$BASE_PATH/src/config/app.ts" ]; then
  cp -f "$BASE_PATH/src/config/app.ts" "$SCRIPT_PATH/app.ts"
fi

# Remove Everything in base path
rm -rf $BASE_PATH/* $BASE_PATH/.*

# Clone Repository
git clone https://github.com/AlanD20/aland20.com.git "$BASE_PATH/."

# Recover .env file if exists
if [ -f "$SCRIPT_PATH/.env" ]; then
  cp -f "$SCRIPT_PATH/.env" "$BASE_PATH/.env"
fi

# Install dependencies
cd "$BASE_PATH" && yarn && yarn db:reset

# Recover Config file if exists
if [ -f "$SCRIPT_PATH/app.ts" ]; then
  cp -f "$SCRIPT_PATH/app.ts" "$BASE_PATH/src/config/app.ts"
fi

# Recover database if exists
if [ -f "$SCRIPT_PATH/db.sqlite" ]; then
  cp -f "$SCRIPT_PATH/db.sqlite" "$BASE_PATH/prisma/db.sqlite"
fi

# Check Setup Process
if [ -f "$BASE_PATH/.env" ]; then
  echo "- [x] Env file copied!"
else
  echo "- [x] Failed to copy env file!"
fi

if [ -f "$BASE_PATH/prisma/db.sqlite" ]; then
  echo "- [x] Database restored!"
else
  echo "- [x] Failed to restore database!"
fi

if grep -Fq "https://aland20.com" "$BASE_PATH/src/config/app.ts"; then
  echo "- [x] Config file updated!"
else
  echo "- [x] Failed to update config file!"
fi

cd "$BASE_PATH" && yarn build && yarn pm2 && pm2 save -f

echo "- [x] Deployment Successsful!"
