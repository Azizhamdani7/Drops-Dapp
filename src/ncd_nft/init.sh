echo "Enter owner account id: "
read OWNER_ID

echo "Please Enter Metadata for this contract"

echo "Please enter spec: "
read SPEC

echo "Please enter name: "
read NAME

echo "Please enter symbol: "
read SYMBOL

near call nft10.testnet new '{"owner_id": "'"$OWNER_ID"'", "metadata": {"spec": "'"$SPEC"'", "name": "'"$NAME"'", "symbol": "'"$SYMBOL"'"}}' --accountId nft10.testnet