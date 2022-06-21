echo "Enter token ID"
read TOKEN_ID
echo " "



echo "Enter metadata of Token"
echo " "

echo "Enter title: "
read TITLE

echo "Enter description: "
read DESCRIPTION

echo "Enter media link: "
read MEDIA

echo "Enter Drop Name: "
read DROP_NAME

near call drops_contract.testnet metadata_insert '{"token_type": "'"$TOKEN_ID"'", "metadata": {"title": "'"$TITLE"'", "description": "'"$DESCRIPTION"'", "media": "'"$MEDIA"'"}, "drop_name": "'"$DROP_NAME"'"}' --accountId drops_contract.testnet