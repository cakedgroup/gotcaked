#!/bin/bash

echo "Starting newman tests..."

newman run ./Server-API.postman_collection.json -e ./Server-API.$1.postman_environment.json
