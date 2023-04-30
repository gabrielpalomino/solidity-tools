#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: ./compile.sh <solidity_file>"
    exit 1
fi

SOLIDITY_FILE=$(realpath $1)

# Set the working directory to the folder containing .env
SCRIPT_DIR="/Users/machd/Documents/codes/solidity/web3-tools"
cd "$SCRIPT_DIR"

node ./src/compile-sol.js "$SOLIDITY_FILE"