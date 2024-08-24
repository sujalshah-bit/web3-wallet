import { create } from "zustand";
import { persist } from "zustand/middleware";

// Updated Account interface
export interface Account {
  name: string;
  ethPublicKey: string; // Ethereum public key address
  ethPrivateKey: string; // Ethereum private key
  solPublicKey: string; // Solana public key
  solPrivateKey: string; // Solana private key
}

interface Network {
  accounts: Account[];
}

interface Store {
  networks: {
    solana: Network;
    eth: Network;
  };
  accounts: Account[];
  currentNetwork: "solana" | "eth";
  currentAccount: Account | null;
  walletPassword: string;
  currentStep: number;
  seedPhrase: string[]; // Array of 12 strings
  setCurrentNetwork: (network: "solana" | "eth") => void;
  setCurrentStep: (step: number) => void;
  setCurrentAccount: (account: Account | null) => void;
  setWalletPassword: (password: string) => void;
  setSeedPhrase: (seedPhrase: string[]) => void; // Method to set the seed phrase
  addAccount: (
    name: string,
    ethPublicKey: string,
    ethPrivateKey: string,
    solPublicKey: string,
    solPrivateKey: string
  ) => void;
  clearAccounts: (network: "solana" | "eth") => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      networks: {
        solana: { accounts: [] },
        eth: { accounts: [] },
      },
      accounts: [],
      currentNetwork: "solana",
      currentAccount: null,
      currentStep: 0,
      walletPassword: "",
      seedPhrase: Array(12).fill(""), // Initialize with an array of 12 empty strings
      setCurrentStep: (step) => set({ currentStep: step }),
      setCurrentNetwork: (network) => set({ currentNetwork: network }),
      setCurrentAccount: (account) => set({ currentAccount: account }),
      setWalletPassword: (password) => set({ walletPassword: password }),
      setSeedPhrase: (seedPhrase) => set({ seedPhrase }), // Update the seed phrase
      addAccount: (
        name: string,
        ethPublicKey: string,
        ethPrivateKey: string,
        solPublicKey: string,
        solPrivateKey: string
      ) => {
        set((state) => ({
          accounts: [
            ...state.accounts,
            { name, ethPublicKey, ethPrivateKey, solPublicKey, solPrivateKey },
          ],
        }));
      },
      clearAccounts: (network) => {
        set((state) => ({
          networks: {
            ...state.networks,
            [network]: {
              ...state.networks[network],
              accounts: [],
            },
          },
        }));
      },
    }),
    {
      name: "wallet-storage",
      onRehydrateStorage: (state) => {
        if (state && state.accounts) {
          // Check if accounts are valid
          const isValid = state.accounts.every(account => 
            account.name && account.ethPublicKey && account.solPublicKey
          );
      
          if (!isValid) {
            console.warn("Rehydrated accounts data is invalid.");
          }
        }
      }
    }
  )
);

export default useStore;
