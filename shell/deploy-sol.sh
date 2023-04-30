#!/bin/bash

if [ "$#" -ne 1 ] && [ "$#" -ne 2 ]; then
    echo "Usage: ./compile.sh <solidity_file> [-v]"
    exit 1
fi

SOLIDITY_FILE=$(realpath $1)

# Set the working directory to the folder containing .env
SCRIPT_DIR="/Users/machd/Documents/codes/solidity/web3-tools"
cd "$SCRIPT_DIR"

if [ "$#" -eq 2 ] && [ "$2" == "-v" ]; then
  node ./src/deploy-sol.js "$SOLIDITY_FILE" "true"
else
  node ./src/deploy-sol.js "$SOLIDITY_FILE"
fi
