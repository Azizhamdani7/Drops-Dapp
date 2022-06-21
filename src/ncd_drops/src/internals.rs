use crate::*;
//use near_sdk::{log, CryptoHash};



impl Contract {
    pub(crate) fn assert_owner(&self) {
        assert!(self.is_owner(), "Owner's method");
    }

    
    pub(crate) fn is_owner(&self) -> bool {
        &env::predecessor_account_id() == &self.owner
    }
}