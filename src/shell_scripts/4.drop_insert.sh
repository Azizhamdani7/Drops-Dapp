echo ""

echo "YOU ARE GOING TO CREATE A DROP (an event)"

echo ""

echo "Enter the start time (in unix timestamp): "
read STARTS_AT

echo "Enter the end time (in unix timestamp): "
read ENDS_AT

echo "Enter the drop name: "
read DROP_NAME

near call drops_contract.testnet drops_insert '{"drop": {"starts_at": '"$STARTS_AT"', "ends_at": '"$ENDS_AT"', "drop_name": "'"$DROP_NAME"'"}}' --accountId drops_contract.testnet