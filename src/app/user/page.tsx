"use client";
import Sidebar from "@/components/Sidebar";
import useSidebarStore from "@/store/client";
import useStore from "@/store/store";
import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import { getSolBalance } from "@/components/solana";
import Image from "next/image";
import { MdContentCopy } from "react-icons/md";
export default function Page() {
  const {
    currentAccount,
    seedPhrase,
  } = useStore();

  const { isOpen, toggle, eth, setEth, sol, setSolana } = useSidebarStore();



  const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const ETH_ADDRESS = currentAccount?.ethPublicKey || "";
  const SOL_ADDRESS = currentAccount?.solPublicKey || "";

  useEffect(() => {
    async function getEthBalance() {
      try {
        const response = await axios.post(
          `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
          {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [ETH_ADDRESS, "latest"],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const balanceInWei = response.data.result;
        const balanceInEth = parseFloat(balanceInWei) / 1e18; // OR LAMPORTS_PER_SOL

        setEth(balanceInEth);
        console.log(`ETH Balance: ${balanceInEth}`);
      } catch (error) {
        console.error("Failed to fetch ETH balance:", error);
      }
    }

    if (ETH_ADDRESS) {
      getEthBalance();
    }
    if (SOL_ADDRESS) {
      getSolBalance();
    }
  }, [ETH_ADDRESS, SOL_ADDRESS, setEth, setSolana, currentAccount]);


  const copyToClipboard = (text: string | undefined) => {
    navigator.clipboard
      .writeText(text?? "sorry")
      .then(() => {
        alert("Copied to clipboard: " + text);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <section>
      <nav className="flex bg-[#14151bff] text-white">
        {isOpen ? (
          <Sidebar />
        ) : (
          <FaBars className="m-5  w-8 h-8 rounded" onClick={toggle} />
        )}
        <div
          className={`p-5   transition-all duration-300 ${
            isOpen ? "blur-sm" : "blur-none"
          }`}
        >
          <h1 className="text-2xl font-bold">Welcome to the App <span style={{color:"#e84548ff"}}>{currentAccount?.name}</span></h1>
        </div>
      </nav>
      <div className="flex flex-col h-screen bg-[#14151bff] text-white">
        <div className=" bg-[#14151bff] flex   justify-center  items-center">
          <div className=" shadow-lg  rounded-lg p-1 justify-center max-w-lg flex gap-5 w-full">
            <div className="mb-4 bg-[#202127ff]  rounded  p-1 w-[400px] h-[200px]">
              <h2 className="text-xl font-semibold ">Keys</h2>
              <div className=" p-4 rounded-lg shadow">
                <p className="truncate">
                  <strong>ETH Address:</strong> {currentAccount?.ethPublicKey}
                  <span>
                    <MdContentCopy size={24} onClick={()=>copyToClipboard(currentAccount?.ethPublicKey)}/>
                  </span>
                </p>
                <p className="truncate">
                  <strong>SOL Public key</strong> {currentAccount?.solPublicKey}
                  <span>
                    <MdContentCopy size={24} onClick={()=>copyToClipboard(currentAccount?.solPublicKey)}/>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ul className=" bg-[#14151bff] cursor-pointer flex items-center w-full flex-col gap-3">
          <li className="bg-[#202127ff] items-center w-[300px] h-16 md:w-1/2 flex gap-7 rounded p-4 shadow-lg transition-all duration-700 ">
            <Image
              src={"/assets/Solana-logo.jpg"}
              height={40}
              width={40}
              alt={"Solana Logo"}
              className="rounded"
            />
            <span className="font-bold text-lg w-full">Solana</span>
            <p className="ml-8"> ${sol !== 123 ? sol : "Loading..."}</p>
          </li>
          <li className="bg-[#202127ff] items-center h-16 w-[300px] md:w-1/2 flex gap-7 rounded p-4 shadow-lg transition-all duration-700 ">
            <Image
              src={"/assets/eth-logo.png"}
              height={40}
              width={40}
              alt={"Ethereum Logo"}
              className="rounded"
            />
            <span className="font-bold text-lg w-full">Ethereum</span>
            <p className="ml-8">${eth !== 123 ? eth : "Loading..."}</p>
          </li>
        </ul>
      </div>
      
    </section>
  );
}
