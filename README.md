# Drops-Dapp
Drops application consists of two smart contracts and React a web application.The purpose of this application is to allow users to purchase NFTs in a drop duration.
# Prerequisites
In order to successfully compile the codes and run the application on local server you will need:
- [Node v18](https://nodejs.org/en/download/current/)
- [NEAR CLI](https://docs.near.org/docs/tools/near-cli)
- [RUST](https://www.rust-lang.org/tools/install)
- Add the WASM (WebAssembly) target to the toolchain by executing ` rustup target add wasm32-unknown-unknown` in terminal or powershell
# Build
In order to generate the wasm files for the contracts, navigate to `/src/` and run the `build.sh` script by typing `./build.sh` in the terminal or powershell.
# Unit Tests
In order to execute the unit tests, navigate to the `src/ncd_drops` and run the `test.sh` script by typing `./test.sh`
# Test Drop Functionality Using CLI
In order to test the whole functionality of the application,navigate to `src/shell_scripts and runt the following scripts in sequence
- `1.metadata_insert.sh.` this script enables the admin(contract owner) to insert the metadata of token including drop in which the token will be displayed.
- `2.nft_price_insert.sh` this script enables admin to insert the price of token.
- `3.supply_cap_insert.sh` this script allows admin to insert the supply of each token.
- `4.drop_insert.sh` this script allows admin to create a new drop. In this script Admin needs to provide Start time, end time (in unix timestamp) and drop name.
- `5.nft_purchase_callback.sh` this script allows user to purchase the token.
- `init.sh` this script allows admin to initialize the drop smart contract.
## Note
 You will need a testnet account in order to interact with the smart contract an account can be created from [here]([wal](https://wallet.testnet.near.org)
 Please use the follwoing addresses for drop contract and nft token contract respectively
 #### Drops contract address = drop_contract.testnet
 #### NFT contract address = nft_contract10.testnet
