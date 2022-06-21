#!/bin/bash
cd "$(dirname "$0")"
near deploy --wasmFile target/wasm32-unknown-unknown/release/nft.wasm --accountId nft10.testnet