

import { mnemonicToSeedSync } from "bip39"; 
import { derivePath } from "ed25519-hd-key"; 
import nacl from "tweetnacl"; 
import bs58 from "bs58"; 
import useStore from "@/store/store";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import useSidebarStore from "@/store/client";
import axios from "axios";

const deriveSolanaAccount = (
  solAccountsLength: number,
  seedPhrase: string[]
) => {
  const derivePathSolana = `m/44'/501'/${solAccountsLength}'/0'`;
  console.log(solAccountsLength);

  const seed = mnemonicToSeedSync(seedPhrase.join(" "));
  const derivedSeed = derivePath(derivePathSolana, seed.toString("hex")).key;

  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  const privateKey = keyPair.secretKey.slice(0, 32);
  const publicKey = keyPair.publicKey;

  
  return {
    publicKey: bs58.encode(publicKey),
    privateKey: bs58.encode(privateKey),
  };
};

export async function getSolBalance() {
  try {
    const { currentAccount } = useStore.getState(); 
    const SOL_ADDRESS = currentAccount?.solPublicKey || "";
    const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
    //     const connection = new Connection('https://api.mainnet-beta.solana.com');
    //   const publicKey = new PublicKey(SOL_ADDRESS);
    //   console.log("public key:", SOL_ADDRESS)
    // //   console.log({connection, publicKey})
    //   const balanceInLamports = await connection.getBalance(publicKey);

    const response = await axios.post(SOLANA_RPC_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [SOL_ADDRESS],
    });

    
    const balanceInLamports = response.data.result.value;

    
    const balanceInSol = balanceInLamports / 1e9; // 1 SOL = 1,000,000,000 lamports

    const { setSolana } = useSidebarStore.getState();
    setSolana(balanceInSol);
    console.log(`SOL Balance: ${balanceInSol}`);
  } catch (error) {
    console.error("Failed to fetch SOL balance:", error);
  }
}

export default deriveSolanaAccount;
