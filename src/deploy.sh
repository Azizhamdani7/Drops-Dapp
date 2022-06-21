#!/bin/bash
cd "$(dirname "$0")"

echo "Enter Account where you want to deploy the contract:"
read ACCOUNT 

echo "Enter the name of wasm file"
read WASM
near deploy --wasmFile target/wasm32-unknown-unknown/release/$WASM --accountId $ACCOUNT