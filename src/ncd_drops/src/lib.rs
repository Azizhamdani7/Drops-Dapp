use std::collections::HashMap;
use std::vec;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::de::value;
use near_sdk::serde::{Deserialize, Serialize};

use crate::metadata::*;
use near_sdk::{env, near_bindgen, AccountId, Balance, PanicOnDefault};

mod internals;
mod metadata;
mod nft_calls;

pub type DropName = String;
pub type TokenType = String;
pub type TokenId = String;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Drop {
    pub starts_at: u64,
    pub ends_at: u64,
    pub drop_name: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]

pub struct Contract {
    metadata: LazyOption<ContractMetadata>, // metadata for the contract itself

    pub nft_price: LookupMap<TokenId, U128>,

    pub nft_token_supply: LookupMap<TokenId, U128>,

    pub minted_nft_tokens: LookupMap<TokenId, U128>,

    pub owner: AccountId,

    pub nft_contract_id: AccountId,

    pub drops: UnorderedMap<DropName, Drop>,

    pub nft_against_drop: LookupMap<DropName, Vec<TokenMetadata>>,
}

#[derive(BorshSerialize)]
pub enum StorageKey {
    NftPrice,
    NftTokenSupply,
    MintedNftTokens,
    Drops,
    NftMetadata,
    NftAgainstDrop,
}
#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(
        owner_id: AccountId,
        nft_contract_id: AccountId,
        metadata: ContractMetadata,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        let this = Self {
            owner: owner_id,
            nft_price: LookupMap::new(StorageKey::NftPrice.try_to_vec().unwrap()),
            nft_token_supply: LookupMap::new(StorageKey::NftTokenSupply.try_to_vec().unwrap()),
            minted_nft_tokens: LookupMap::new(StorageKey::MintedNftTokens.try_to_vec().unwrap()),
            drops: UnorderedMap::new(StorageKey::Drops.try_to_vec().unwrap()),
            metadata: LazyOption::new(
                StorageKey::NftMetadata.try_to_vec().unwrap(),
                Some(&metadata),
            ),
            nft_against_drop: LookupMap::new(StorageKey::NftAgainstDrop.try_to_vec().unwrap()),
            nft_contract_id,
        };
        this
    }

    pub fn drops_insert(&mut self, drop: Drop) {
        self.assert_owner();
        self.drops.insert(&drop.drop_name, &drop);
    }
    pub fn nft_price_insert(&mut self, token_id: TokenId, price: U128) {
        self.assert_owner();
        self.nft_price.insert(&token_id, &price);
    }
    pub fn supply_cap_insert(&mut self, token_id: TokenId, supply: U128) {
        self.assert_owner();
        self.nft_token_supply.insert(&token_id, &supply);
    }
    pub fn get_drop_nft(&self, drop_name: DropName) -> Option<Vec<TokenMetadata>> {
        self.nft_against_drop.get(&drop_name)
    }
    pub fn nft_get_price(self, token_id: TokenId) -> Option<U128> {
        let price = self.nft_price.get(&token_id);
        if price.is_some() {
            return Some(U128::from(price.unwrap()));
        }
        None
    }
    // for (key, val) in gfg.iter() {
    //     println!("{} {}", key, val);
    //  }

    pub fn get_drops(&self) -> Vec<Drop> {
        // let drops: HashMap<DropName, Vec<TokenMetadata>> = self.drops.try_from().unwrap();
        let mut vec:Vec<Drop> = Vec::new();

        for (key, val) in self.drops.iter() {
            vec.push(val);
        }
        vec
    }
    pub fn remove_drop(&mut self, drop_name: DropName){
        self.drops.remove(&drop_name);
    }
}

#[cfg(test)]
mod drop_tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};
    use std::convert::TryInto;

    const ALICE: &str = "alice.testnet";

    fn get_context() -> VMContext {
        VMContext {
            current_account_id: "contract.testnet".to_string(), // account that signed the initial transaction
            predecessor_account_id: String::from(ALICE), // the last account who made the current contract call
            signer_account_id: String::from(ALICE), // account that signed the initial transaction
            signer_account_pk: vec![0, 1, 2],
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18), // 1 * 10^18
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 19,
            storage_usage: 0,
        }
    }

    fn get_contract_metadata() -> ContractMetadata {
        ContractMetadata {
            spec: "DROPS 1.0".to_string(),
            name: "DROPS CONTRACT".to_string(),
            symbol: "DROPS".to_string(),
            icon: None,
            base_uri: None,
            reference: None,
            reference_hash: None,
        }
    }

    #[test]
    fn test_contract_instantiation() {
        let context = get_context();
        testing_env!(context.clone());

        let metadata = get_contract_metadata();
        let contract = Contract::new(
            context.signer_account_id.clone().try_into().unwrap(),
            context.signer_account_id.clone().try_into().unwrap(),
            metadata.clone(),
        );
        assert_eq!(
            contract.metadata.get().unwrap().name,
            metadata.name,
            "Contract metadata not set correctly"
        );
    }
    #[test]
    fn drops_insertion_test() {
        let context = get_context();
        testing_env!(context.clone());

        let metadata = get_contract_metadata();
        let mut contract = Contract::new(
            context.signer_account_id.clone().try_into().unwrap(),
            context.signer_account_id.clone().try_into().unwrap(),
            metadata.clone(),
        );
        let drop = Drop {
            starts_at: 1655113516,
            ends_at: 1655115316,
            drop_name: "Test drop".to_string(),
        };
        contract.drops_insert(drop);
    }
    #[test]
    fn price_insertion_test() {
        let context = get_context();
        testing_env!(context.clone());

        let metadata = get_contract_metadata();
        let mut contract = Contract::new(
            context.signer_account_id.clone().try_into().unwrap(),
            context.signer_account_id.clone().try_into().unwrap(),
            metadata.clone(),
        );
        let token_id: String = "alpha".to_string();
        let price = U128::from(1000000000000000000000000);

        contract.nft_price_insert(token_id, price);
    }
    #[test]
    fn supply_cap_insertion_test() {
        let context = get_context();
        testing_env!(context.clone());

        let metadata = get_contract_metadata();
        let mut contract = Contract::new(
            context.signer_account_id.clone().try_into().unwrap(),
            context.signer_account_id.clone().try_into().unwrap(),
            metadata.clone(),
        );
        let token_id = "alpha".to_string();
        let supply = U128::from(55);
        contract.supply_cap_insert(token_id, supply);
    }
}
