#!/bin/bash

USER=
SCRIPT_PATH=
BASE_PATH=

# Find bin directory path for global npm packages using 'npm config get prefix'
PATH=$PATH:/home/$USER/.nvm/versions/node/lts/bin

# Stop portfolio service
pm2 delete nextjs-portfolio && pm2 save -f

# Copy database file
if [ -f "$BASE_PATH/prisma/db.sqlite" ]
then
        cp -f "$BASE_PATH/prisma/db.sqlite" "$SCRIPT_PATH/db.sqlite"
fi


# Remove Everything in base path
rm -rf $BASE_PATH/* $BASE_PATH/.*

# Clone Repository
git clone https://github.com/AlanD20/aland20.tech.git "$BASE_PATH/."

# Copy env file
cp -f "$SCRIPT_PATH/.env" "$BASE_PATH/.env"

# Install dependencies
cd "$BASE_PATH" && yarn && yarn db:reset

# Setup Project
cp -f "$SCRIPT_PATH/config.ts" "$BASE_PATH/src/app/config.ts"

if [ -f "$SCRIPT_PATH/db.sqlite" ]
then
        cp -f "$SCRIPT_PATH/db.sqlite" "$BASE_PATH/prisma/db.sqlite"
fi


# Check Setup Process
if [ -f "$BASE_PATH/.env" ]
then
        echo "- [x] Env file copied!"
else
        echo "- [x] Failed to copy env file!"
fi

if [ -f "$BASE_PATH/prisma/db.sqlite" ]
then
        echo "- [x] Database restored!"
else
        echo "- [x] Failed to restore database!"
fi

if grep -Fq "https://aland20.tech" "$BASE_PATH/src/app/config.ts"
then
        echo "- [x] Config file updated!"
else
        echo "- [x] Failed to update config file!"
fi


cd "$BASE_PATH" && yarn build && yarn pm2 && pm2 save -f

echo "- [x] Deployment Successsful!"
