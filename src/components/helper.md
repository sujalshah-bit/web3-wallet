```ts
import * as nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';

import { Keypair } from "@solana/web3.js";
// Generate mnemonic and seed
const mnemonic = generateMnemonic();
const seed = mnemonicToSeedSync(mnemonic);

for (let i = 0; i < 4; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  
  // Generate key pair
  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
  
  // Extract the private key (first 32 bytes)
  const privateKey = keyPair.secretKey.slice(0, 32);
  
  // Regenerate the public key from the private key
  const regeneratedKeyPair = nacl.sign.keyPair.fromSeed(privateKey);
  const regeneratedPublicKey = regeneratedKeyPair.publicKey;
  
  // Compare the regenerated public key with the original public key
  const isMatch = Buffer.from(keyPair.publicKey).toString('hex') === Buffer.from(regeneratedPublicKey).toString('hex');
  
  console.log(`Key Pair ${i}:`);
  console.log("  Derived seed:", derivedSeed);
  console.log("  Private Key:", bs58.encode(privateKey));
  console.log("  Public Key (original):", bs58.encode(keyPair.publicKey));
  console.log("  Public Key (regenerated):", bs58.encode(regeneratedPublicKey));
  console.log("  Do the keys match?:", isMatch ? "Yes" : "No");
  console.log(Keypair.fromSecretKey(keyPair.secretKey).publicKey.toBase58());
}
```