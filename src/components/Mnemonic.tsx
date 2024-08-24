"use client";
// MnemonicComponent.tsx
import React, { useState } from "react";
import DarkSemiRoundedButton from "./PrimaryButton";
import { generateMnemonic } from "bip39";
import { StepComponentProps } from "./stepConfig";
import deriveSolanaAccount from "./solana";
import useStore from "@/store/store";
import generateEthereumKeys from "./ethereum";

export const MnemonicComponent: React.FC<StepComponentProps> = ({ onNext }) => {
  const [mnemonic, setMnemonic] = useState(generateMnemonic().split(" "));
  const [loading, setLoading] = useState(false); 
  const {
    solanaAccountsLength,
    ethAccountsLength,
    addAccount,
    setCurrentAccount,
  } = useStore((state) => ({
    solanaAccountsLength: state.accounts.length,
    ethAccountsLength: state.accounts.length,
    addAccount: state.addAccount,
    setCurrentAccount: state.setCurrentAccount,
  }));

  const regenerateMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic.split(" "));
  };

  const handleSeedSelection = async (seedPhrase: string[]) => {
    setLoading(true);
    onNext(seedPhrase);
    const { publicKey, privateKey } = deriveSolanaAccount(
      solanaAccountsLength,
      seedPhrase
    );
    const { ethpublicKey, ethPrivateKey } = await generateEthereumKeys(
      ethAccountsLength,
      seedPhrase
    );
    addAccount(
      "account 1",
      ethpublicKey, // Ethereum public key
      ethPrivateKey, // Ethereum private key
      publicKey, // Solana public key
      privateKey
    );

    setCurrentAccount({
      name: "account 1",
      ethPublicKey: ethpublicKey, // Ethereum public key
      ethPrivateKey: ethPrivateKey, // Ethereum private key
      solPublicKey: publicKey, // Solana public key
      solPrivateKey: privateKey,
    });
    setLoading(false);
  };

  const copyToClipboard = () => {
    const mnemonicString = mnemonic.join(" ");
    navigator.clipboard
      .writeText(mnemonicString)
      .then(() => {
        alert("Mnemonic copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="text-white flex flex-col items-center justify-center w-full h-screen bg-background">
      <div className="max-w-md w-full">
        <h1 className="text-3xl mb-10 font-bold text-foreground text-center">
          Seed phrase
        </h1>
        <p className="text-muted-foreground mb-5">
          This is your 12-word recovery phrase to access your accounts.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {mnemonic.map((elem, i) => (
            <div
              key={i}
              className="relative h-12 w-32 bg-slate-50 text-black font-medium flex items-center justify-center bg-muted rounded-md transition-all duration-200 group hover:bg-muted/75 hover:scale-105 hover:shadow-lg"
            >
              {elem}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-10">
          <DarkSemiRoundedButton
            bgColor={"#0c2c24ff"}
            textColor={"#00b64dff"}
            text={"Generate New"}
            className="w-full"
            onClick={regenerateMnemonic}
          />
          <DarkSemiRoundedButton
            bgColor={"#18253aff"}
            textColor={"#4c94ffff"}
            text={"Copy Phrases"}
            className="w-full"
            onClick={copyToClipboard}
          />
          <DarkSemiRoundedButton
            bgColor={"#18253aff"}
            textColor={"#4c94ffff"}
            text={"Confirm"}
            className="w-full"
            onClick={() => {
              handleSeedSelection(mnemonic);
            }}
            disabled={loading} 
          />
        </div>
      </div>
    </div>
  );
};
