#!/bin/bash

echo "Cloning Server Repo from GitHub.com..."
git clone git@github.com:cakedgroup/gotcaked.git
echo "Repo Cloned"

echo "Swiching to Dir"
cd ./gotcaked

echo "Copy Env-File from Server"
cp ../config.env ./config.env

echo "Getting current tag"
tag=$(git describe --tags `git rev-list --tags --max-count=1`)

echo "Building from source files"
docker-compose build --build-arg GITVERSION=$tag

echo "Starting containers"
docker-compose up -d

echo "Started Containers..."
echo "Cleaning Up Source Files"
rm -rf ~/gotcaked

exit 0
