"use client"

// AddToNetwork.tsx
import React from "react";
import Image from "next/image";
import { StepComponentProps } from "./stepConfig";

export const AddToNetwork: React.FC<StepComponentProps> = ({ onNext }) => {
  const handleNetworkSelection = (network: string) => {
    onNext(network); // Pass the selected network to the centralized logic
  };

  return (
    <div className="text-white flex flex-col items-center justify-center w-full h-screen bg-background">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-foreground text-center">Select network</h1>
        <p className="text-gray-500 text-sm text-muted-foreground my-5">
          This wallet supports multiple blockchains. Which do you want to use? You can add more later.
        </p>
        <ul className="cursor-pointer flex flex-col gap-3">
          <li
            onClick={() => handleNetworkSelection("solana")}
            className="bg-[#14151bff] flex gap-7 rounded p-4 shadow-lg transition-all duration-700 hover:scale-110"
          >
            <Image src={"/assets/Solana-logo.jpg"} height={50} width={50} alt={"Solana Logo"} className="rounded" />
            <span className="font-bold text-lg w-full">Solana</span>
          </li>
          <li
            onClick={() => handleNetworkSelection("eth")}
            className="bg-[#14151bff] flex gap-7 rounded p-4 shadow-lg transition-all duration-700 hover:scale-110"
          >
            <Image src={"/assets/eth-logo.png"} height={50} width={50} alt={"Ethereum Logo"} className="rounded" />
            <span className="font-bold text-lg w-full">Ethereum</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
