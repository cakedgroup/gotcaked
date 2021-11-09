#!/bin/bash

echo "Starting newman tests..."

newman run ./gotCaked.postman_collection.json -e ./$1.postman_environment.json
