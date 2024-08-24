"use client"
import generateEthereumKeys from '@/components/ethereum';
import deriveSolanaAccount from '@/components/solana';
import useStore from '@/store/store';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';

const Page: React.FC = () => {
  const router = useRouter();
  
  const {
    networks,
    currentNetwork,
    currentAccount,
    walletPassword,
    currentStep,
    accounts,
    seedPhrase,
    setCurrentNetwork,
    setCurrentAccount,
    setWalletPassword,
    setCurrentStep,
    setSeedPhrase,
    addAccount,
    
    solanaAccountsLength,
  } = useStore((state) => ({
    networks: state.networks,
    currentNetwork: state.currentNetwork,
    currentAccount: state.currentAccount,
    walletPassword: state.walletPassword,
    currentStep: state.currentStep,
    seedPhrase: state.seedPhrase,
    setCurrentNetwork: state.setCurrentNetwork,
    accounts: state.accounts,
    setCurrentAccount: state.setCurrentAccount,
    setWalletPassword: state.setWalletPassword,
    setCurrentStep: state.setCurrentStep,
    setSeedPhrase: state.setSeedPhrase,
    addAccount: state.addAccount,
    solanaAccountsLength: state.accounts.length,
  }));
 
  
  const [accName, setAccName] = useState<string>(`account ${solanaAccountsLength+1}`)
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const { publicKey, privateKey } = deriveSolanaAccount(
      solanaAccountsLength,
      seedPhrase
    );
    const { ethpublicKey, ethPrivateKey } = await generateEthereumKeys(
      solanaAccountsLength,
      seedPhrase
    );
    addAccount(
      accName,
      ethpublicKey, 
      ethPrivateKey, 
      publicKey, 
      privateKey
    );

    setCurrentAccount({
      name: accName,
      ethPublicKey: ethpublicKey, 
      ethPrivateKey: ethPrivateKey, 
      solPublicKey: publicKey, 
      solPrivateKey: privateKey,
    });
   
    console.log({ accName });
    router.push('/user')
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Creat new account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Account name:
                </label>
                <input
                  type="text"
                  name="account-name"
                  id="account-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Account 1"
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;