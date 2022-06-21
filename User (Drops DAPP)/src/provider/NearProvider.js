import { createContext, useCallback, useEffect, useState } from "react";
import { connect, keyStores, WalletConnection, utils, Contract } from "near-api-js";
import { parseNearAmount } from "near-api-js/lib/utils/format";
/* import NFT from "../models/NFT";
import Purchasable from "../models/Purchasable";
import viewToMax from "../utils/viewToMax"; */


// --- Production: mainnet ---
// const config = {
//   networkId: "mainnet",
//   contractName: "mtvrs-app.near",
//   nodeUrl: "https://rpc.mainnet.near.org",
//   walletUrl: "https://wallet.mainnet.near.org",
//   helperUrl: "https://helper.mainnet.near.org",
//   explorerUrl: "https://explorer.mainnet.near.org",
// };

// --- Development: testnet ---
const config = {
  networkId: "testnet",
  contractName: "drops_contract.testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const GAS = "300000000000000"; // max gas for any transaction

export const NearContext = createContext({});

export default function NearProvider({ children }) {
  // Internal state
  const [, setNearConnection] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);
  const [accountId, setAccountId] = useState(null);

  // External state.
  const [isConnecting, setIsConnecting] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggingIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountUsername, setAccountUsername] = useState(null);
  const [ownedNfts, setOwnedNfts] = useState([]);

  useEffect(() => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const connectNear = async () => {
      try {
        const near = await connect({ ...config, keyStore });
        const walletConnection = new WalletConnection(near);
        setNearConnection(near);
        setWalletConnection(walletConnection);

        if (walletConnection.isSignedIn()) {
          const account = walletConnection.account();
          const name = walletConnection._authData.accountId;
          setAccountId(walletConnection.getAccountId());
          setIsSignedIn(true)
          setAccount(account)

        } else {
          setIsSignedIn(false)

        }
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
      setIsConnecting(false);
    };

    connectNear();
  }, []);

  const login = useCallback(() => {
    walletConnection?.requestSignIn({
      contractId: config.contractName,

    }
    );

  }, [walletConnection]);

  const logout = useCallback(() => {
    walletConnection?.signOut();
    setIsSignedIn(false);
    setAccountId(null);
    setAccount(null);
  }, [walletConnection]);



  const nftPriceView = async (tokenId)=>{
        if (account == null) {
          // throw new Error("Account must be defined");
        }else{
          let price = await account?.viewFunction(
            config.contractName, "nft_get_price",
            {
              token_id : tokenId.toString(),
            });
            return utils.format.formatNearAmount(price)
        }

      }

  const dropsInsert = async (starts_at,ends_at,drop_name) => {
      if (account == null) {
        // throw new Error("Account must be defined");
      }
      try {
        const resp = await account.functionCall({
          contractId: config.contractName,
          methodName: "drops_insert",
          args: {
            drop: {
              starts_at,
              ends_at,  
              drop_name
            }
          }, gas: GAS,
        })
        console.log('resp*****', resp)
        alert('Submitted successfully')
      } catch (error) {
        console.log('error****', error)
      }

    }

  const supplyInsert  = async (token_id,supply) => {
      if (account == null) {
        // throw new Error("Account must be defined");
      }
      try {
        const resp = await account.functionCall({
          contractId: config.contractName,
          methodName: "supply_cap_insert",
          args: {
            token_id,
            supply          
          }, gas: GAS,
        })
        console.log('resp*****', resp)
      } catch (error) {
        console.log('error****', error)
      }

    }

    const fetchDropNfts = async (dropName)=>{
      if (account == null) {
        // throw new Error("Account must be defined");
      } else {
        let nfts = await account?.viewFunction(
          config.contractName, "get_drop_nft",
          {
            drop_name : dropName,
          });
          return nfts
      }

    }
  
    const fetchNfts  =  async () => {
      if (account === null){
        // throw new Error("Account must be defined");
      } else {
        console.log('acc**************************',accountId)
        const nftContract =  new Contract(account,"nft_contract10.testnet",{
          viewMethods : ["nft_tokens_for_owner"],
          sender : accountId,
          args: {
            account_id: accountId
          }
        })
        let nfts;
        nfts = await nftContract?.nft_tokens_for_owner(
          {account_id : accountId}
        );
        console.log('***********************NFTs',nfts)
        return nfts
      }

  }

  const fetchDrops = async ()=>{
    if (account == null) {
      // throw new Error("Account must be defined");
    } else{
      let nfts = await account?.viewFunction(
        config.contractName, "get_drops");
        return nfts
    }

  }


  const nftPurchase = async (tokenId, dropName,numberOfTokens) => {


   const price = await nftPriceView(tokenId);

   let amount  = price * numberOfTokens;
    console.log("amount*****************",tokenId, dropName,numberOfTokens, amount);



   if (account == null) {
     throw new Error("Account must be defined");
   }

   return account.functionCall({
     contractId: config.contractName,
     methodName: "nft_purchase_callback",
     args: {
       account_id: accountId,
       number_of_tokens: parseInt(numberOfTokens),
       token_id : tokenId,
       drop_name: dropName
     },
     gas: GAS,
     attachedDeposit: parseNearAmount(amount.toString()),
   });
   
 }

  

  return (
    
    <NearContext.Provider
      value={{
        accountUsername,
        isConnecting,
        isLoggingIn,
        isError,
        isSignedIn,
        login,
        logout,
        accountId,
        account,
        supplyInsert,
        dropsInsert,
        nftPriceView,
        nftPurchase,
        fetchNfts,
        fetchDropNfts,
        fetchDrops
      }}
    >
      {children}
    </NearContext.Provider>
  );
}