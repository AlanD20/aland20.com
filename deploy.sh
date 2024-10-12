#!/usr/bin/env bash

user=$1
backup_path=$2
project_path=$3

if [[ $user == "" || $backup_path == "" || $project_path == "" ]]; then
  echo "- [x] Args are required: (1) user (2) absolute script path (3) absolute project path"
  exit 1
fi

# Find bin directory path for global npm packages using 'npm config get prefix'
PATH=$PATH:/home/$USER/.nvm/versions/node/lts/bin

# Stop portfolio service
pm2 delete nextjs-portfolio && pm2 save -f

if $?; then
  echo "- [x] unable to delete existing project from pm2 list"
  exit 1
fi

files_need_backup=(
  "prisma/db.sqlite"  # current database
  ".env"              # .env file
  "src/config/app.ts" # app configuration
)

# Take backups
for file in "${files_need_backup[@]}"; do
  if [ -f "$project_path/$file" ]; then
    filename=$(basename "$file")
    cp -f "$project_path/$file" "$backup_path/$filename"
  fi
done

# Remove Everything in base path
rm -rf "$project_path"

# Clone Repository
git clone ssh://git@github.com:AlanD20/aland20.com.git "$project_path/."

# Recover .env file if exists
if [ -f "$backup_path/.env" ]; then
  cp -f "$backup_path/.env" "$project_path/.env"
fi

# Recover Backups
for file in "${files_need_backup[@]}"; do
  filename=$(basename "$file")
  if [ -f "$backup_path/$filename" ]; then
    cp -f "$backup_path/$filename" "$project_path/$file"
    echo "- [x] Successful restore: $file"
    continue
  fi

  echo "- [x] Failed to restore: $file"
done

# Install dependencies
cd "$project_path" && pnpm && pnpm db:push && pnpm build && pnpm pm2 && pm2 save -f

if $?; then
  echo "- [x] Failed to build project"
  exit 1
fi

echo "- [x] Deployment successful!"
