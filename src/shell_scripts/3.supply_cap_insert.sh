echo "Enter Token ID: "
read TOKEN_ID

echo "Enter the supply: "
read SUPPLY

near call drops_contract.testnet supply_cap_insert '{"token_id": "'"$TOKEN_ID"'", "supply": "'"$SUPPLY"'"}' --accountId drops_contract.testnet