import { ethers } from "ethers";
import { mnemonicToSeedSync } from "bip39";



const verifyEthereumKeys = (publicKey: string, address: string): boolean => {
    try {
        if (!publicKey.startsWith('0x')) {
            publicKey = '0x' + publicKey;
        }

        const computedAddress = ethers.computeAddress(publicKey);

        if (computedAddress.toLowerCase() === address.toLowerCase()) {
            console.log('The public key and address are a valid pair.');
            return true;
        } else {
            console.log('The public key and address do not match.');
            return false;
        }
    } catch (error) {
        console.error('Error verifying the keys:', error);
        return false;
    }
};

const generateEthereumKeys = async (ethAccountsLength: number, seedPhrase: string[]) => {
    const seed = mnemonicToSeedSync(seedPhrase.join(" "));

    const hdNode = ethers.HDNodeWallet.fromSeed(seed); 
    const wallet = hdNode.derivePath(`m/44'/60'/${ethAccountsLength}'/0/0`);

    const privateKey = wallet.privateKey;

    const publicKey = wallet.publicKey;

    console.log(privateKey, publicKey)

    const address = wallet.address;

    console.log("Seed Phrase:", seedPhrase);
    console.log("Private Key:", privateKey);
    console.log("Public Key:", publicKey);
    console.log("Address:", address);

    verifyEthereumKeys(publicKey,address)
    return {ethpublicKey: address, ethPrivateKey:privateKey}
};

export default generateEthereumKeys;