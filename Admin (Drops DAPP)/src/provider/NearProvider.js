import { createContext, useCallback, useEffect, useState } from "react";
import { connect, keyStores, WalletConnection, utils, Contract } from "near-api-js";

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
  
  const [, setNearConnection] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);
  const [accountId, setAccountId] = useState(null);

  const [isConnecting, setIsConnecting] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggingIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountUsername, setAccountUsername] = useState(null);

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

  const insertMetadata = async (token_type,metadata,drop_name) => {
      if (account == null) {
        throw new Error("Account must be defined");
      }
      try {
        const resp = await account.functionCall({
          contractId: config.contractName,
          methodName: "metadata_insert",
          args: {
            token_type,
            metadata,
            drop_name
          }, gas: GAS,
        })
        console.log('resp*****', resp)
        alert('Submitted successfully')

      } catch (error) {
        console.log('error****', error)
      }

    }


  const nftPriceInsert = async (token_id,price) => {
      if (account == null) {
        throw new Error("Account must be defined");
      }
      try {
        const resp = await account.functionCall({
          contractId: config.contractName,
          methodName: "nft_price_insert",
          args: {
            token_id,
            price:utils.format.parseNearAmount(price)
           }, gas: GAS,
        })
        console.log('resp*****', resp)
        alert('Submitted successfully')

      } catch (error) {
        console.log('error****', error)
      }
    }

  const dropsInsert = async (starts_at,ends_at,drop_name) => {
      if (account == null) {
        throw new Error("Account must be defined");
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
        throw new Error("Account must be defined");
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
        alert('Submitted successfully')

      } catch (error) {
        console.log('error****', error)
      }

    }

    const removeDrop  = async (dropName) => {
      if (account == null) {
        throw new Error("Account must be defined");
      }
      try {
        const resp = await account.functionCall({
          contractId: config.contractName,
          methodName: "remove_drop",
          args: {
            drop_name: dropName,
          }, gas: GAS,
        })
        console.log('resp*****', resp)
        alert('Submitted successfully')

      } catch (error) {
        console.log('error****', error)
      }

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
        nftPriceInsert,
        insertMetadata,
        removeDrop
      }}
    >
      {children}
    </NearContext.Provider>
  );
}