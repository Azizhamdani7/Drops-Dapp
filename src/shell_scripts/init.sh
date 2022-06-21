echo "Please enter owner ID   eg: myaccount.testnet"
read OWNER_ID

echo "please enter NFT contract ID   eg: nft.testnet"
read NFT_CONTRACT_ID

echo "Please enter metadat of the contract"
echo ""

echo "Enter Spec:"
read SPEC

echo "Enter name: "
read NAME

echo "Enter symbol"
read SYMBOL

near call drops_contract.testnet new '{"owner_id": "'"$OWNER_ID"'", "nft_contract_id": "'"$NFT_CONTRACT_ID"'", "metadata": {"spec": "'"$SPEC"'", "name": "'"$NAME"'", "symbol": "'"$SYMBOL"'"}}' --accountId drops_contract.testnet