echo ""

echo "After logging in with your account ID"
echo ""

echo "please enter your testnet account ID: "
read ACCOUNT_ID

echo "Plese enter receiver testnet account ID: "
read RECEIVER_ID

echo "Enter the number of tokens you want to purchase: "
read QUANTITY

echo "Enter the token ID you want to purchase: "
read TOKEN_ID

echo "Enter the drop name: "
read DROP_NAME

echo "Attach the matching deposit to successfully proceed."
echo ""

echo "Enter the amount*quantity in NEAR:"
read AMOUNT

near call drops_contract.testnet nft_purchase_callback '{"account_id": "'"$RECEIVER_ID"'", "number_of_tokens": '"$QUANTITY"', "token_id": "'"$TOKEN_ID"'", "drop_name": "'"$DROP_NAME"'"}' --accountId $ACCOUNT_ID --deposit $AMOUNT