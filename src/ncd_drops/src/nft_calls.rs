use crate::*;
use near_sdk::log;
use near_sdk::{ext_contract, PromiseResult, Gas};
use std::convert::TryInto;
// const NFT_CONTRACT_ID :String = "abc.testnet".to_string();
// const ACCOUNTID : AccountId = NFT_CONTRACT_ID.try_into().unwrap();

const NO_DEPOSIT: Balance = 0;
const BASE_GAS: Gas = 5_000_000_000_000;
const ONE_YOCTO: Balance = 100000000000000000000000;

trait NftCalls{
    fn metadata_insert(&mut self, token_type :String, metadata: TokenMetadata, drop_name : DropName);
    //fn nft_price_insert(&mut self, token_id: TokenId, price:U128);
    //fn nft_get_price(self, token_id: TokenId) -> Option<U128>;
    //fn drops_insert(&mut self, drop : Drop);
    //fn supply_cap_insert(&mut self, token_id: TokenId, supply: U128);
    fn get_minted_tokens(&self, token_id: TokenId) -> Option<U128>;



    fn nft_purchase_callback(&mut self, account_id: AccountId, number_of_tokens: u128, token_id : TokenId, drop_name: DropName);
    fn did_promise_succeded() -> bool;
}
#[ext_contract(ext_nft)]


trait NftContractMethods{
    fn metadata_insert(&mut self, token_type :String, metadata: TokenMetadata);
    fn nft_custom_mint(&mut self, quantity: u128, receiver_id: AccountId, token_type: TokenId); 

}
#[ext_contract(this_contract)]
trait Callbacks {
    fn nft_purchase_callback(account_id: AccountId);
}

#[near_bindgen]
impl NftCalls for Contract{

    

    //INSERT FUNCTIONS
    fn metadata_insert(&mut self, token_type: String, metadata: TokenMetadata, drop_name : DropName){
        ext_nft::metadata_insert(token_type.clone(), metadata.clone(), &self.nft_contract_id, NO_DEPOSIT, BASE_GAS);
        let tokens = self.nft_against_drop.get(&drop_name.clone());
        if tokens.is_some(){
            let mut t = tokens.unwrap();
            t.push(metadata);
            self.nft_against_drop.insert(&drop_name, &t);

        }else {
            let mut tokens:Vec<TokenMetadata> = Vec::new();
            tokens.push(metadata);
            self.nft_against_drop.insert(&drop_name, &tokens);
        }
        
    }

    //GET FUNCTION
    
    fn get_minted_tokens(&self, token_id: TokenId) -> Option<U128>{
        let minted_tokens = self.minted_nft_tokens.get(&token_id);
        if minted_tokens.is_some(){
            return Some(U128::from(minted_tokens.unwrap()));
        }
        None
    }
    



#[payable]
fn nft_purchase_callback(
    &mut self,
    account_id: AccountId,
    number_of_tokens: u128,
    token_id : TokenId,
     drop_name: DropName
    ) {

    let mut price: u128 = self.nft_price.get(&token_id).unwrap().try_into().unwrap();
    price = number_of_tokens*price;
    let cap: u128 = self.nft_token_supply.get(&token_id).unwrap().try_into().expect("Supply not defined");
    let minted_nft_tokens = self.minted_nft_tokens.get(&token_id);
    let start_time = self.drops.get(&drop_name).unwrap().starts_at;
    let end_time = self.drops.get(&drop_name).unwrap().ends_at;
    let now = env::block_timestamp() /1000000000;
    assert!(now>=start_time&&now<=end_time, "event hasn't started yet or expired");
    assert!(env::attached_deposit() >= price.into(), "Attached deposit is less than price");
    
    if minted_nft_tokens.is_some(){
        let mut tokens:u128 = minted_nft_tokens.unwrap().try_into().unwrap();
        log!("Number of tokens minted : {}", tokens );
        assert!(tokens+number_of_tokens<=cap, "can not mint anymore tokens");
        tokens+=number_of_tokens;
        self.minted_nft_tokens.insert(&token_id, &U128::from(tokens));
    }else{
        let mut tokens = 0;
        tokens+=number_of_tokens;
        self.minted_nft_tokens.insert(&token_id, &U128::from(tokens));
    }
    ext_nft::nft_custom_mint(number_of_tokens.try_into().unwrap()  , account_id, token_id,  &self.nft_contract_id.clone(),  ONE_YOCTO, BASE_GAS*4);
    }


    fn did_promise_succeded() -> bool {
        if env::promise_results_count() != 1 {
            log!("Expected a result on the callback");
            return false;
        }
        match env::promise_result(0) {
            PromiseResult::Successful(_) => true,
            _ => false,
        }
    }
}