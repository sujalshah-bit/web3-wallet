"use client"
import LandingPage from "@/components/LandingPage";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import bs58 from "bs58";
import Image from "next/image";

export default function Home() {

  return (
    <section>
      <LandingPage/>
    </section>
  );
}
