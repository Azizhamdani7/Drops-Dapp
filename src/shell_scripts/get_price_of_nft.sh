echo "TO CHECK THE PRICE OF A TOKEN PLEASE ENTER THE TOKEN ID"
read TOKEN_ID

near view drops_contract.testnet nft_get_price '{"token_id": "'"$TOKEN_ID"'"}'