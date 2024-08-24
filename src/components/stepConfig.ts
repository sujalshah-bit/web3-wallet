"use client"

import useStore from "@/store/store";
import { AddToNetwork } from "./AddToNetwork";
import { WalletPassword } from "./WalletPassword";
import { MnemonicComponent } from "./Mnemonic";



export type StepComponentProps = {
  onNext: (data?: any) => void;
};


type StepConfig = {
  component: React.FC<StepComponentProps>;
  onNext: (store: typeof useStore, data?: any) => void;
};

const stepsConfig: StepConfig[] = [
//   {
//     component: AddToNetwork,
//     onNext: (store, network) => {
//       store.getState().setCurrentNetwork(network); // Set network in store
//     },
//   },
  {
    component: WalletPassword,
    onNext: (store, password) => {
      store.getState().setWalletPassword(password); // Set password in store
    },
  },
  {
    component: MnemonicComponent,
    onNext: (store, seedPhrase) => {
      store.getState().setSeedPhrase(seedPhrase);
    },
  },
];

export default stepsConfig;
