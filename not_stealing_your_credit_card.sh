#! /bin/bash

# creates and runs docker

echo "-------------------------"
echo "Creating image"
echo "-------------------------"
docker build --tag 'inventory-manager' .

echo "-------------------------"
echo "Running inventory manager (localhost:3000)"
echo "-------------------------"
docker run -d -p 127.0.0.1:3000:3000 inventory-manager