echo "// Only the owner of this contract can insert price of an NFT"

echo "Enter token ID"
read TOKEN_ID

echo "Enter price"
read PRICE

near call drops_contract.testnet nft_price_insert '{"token_id": "'"$TOKEN_ID"'", "price": "'"$PRICE"'"}' --accountId drops_contract.testnet