#!/bin/bash

echo "Cloning Server Repo from GitHub.com..."
git clone git@github.com:cakedgroup/gotcaked.git
echo "Repo Cloned"

echo "Starting Docker-Compose"
cd ./gotcaked

echo "Starting containers"
docker-compose up -d

echo "Started Containers..."
echo "Cleaning Up Source Files"
rm -rf ~/gotcaked

exit 0
