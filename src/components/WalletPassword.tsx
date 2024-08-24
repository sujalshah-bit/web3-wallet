"use client"

import React, { useState } from "react";
import DarkSemiRoundedButton from "./PrimaryButton";
import { StepComponentProps } from "./stepConfig";

export const WalletPassword: React.FC<StepComponentProps> = ({ onNext }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSelection = (password: string) => {
    onNext(password);
  };

  return (
    <div className="text-white flex flex-col items-center justify-center w-full h-screen bg-background">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-foreground text-center mb-3">Create a password</h1>
        <p className="text-[#969fafff] text-muted-foreground mb-5 text-center break-words">
          create a wallet password.
        </p>
        <input
          type="password"
          placeholder="Easy to remember"
          className="p-3 rounded-md bg-transparent w-full border-[#969fafff] border-2 mb-5"
          value={password}
          onChange={handlePasswordChange}
        />
        <DarkSemiRoundedButton
          bgColor={"#18253aff"}
          textColor={"#4c94ffff"}
          text={"Next"}
          className="w-full"
          onClick={() => handlePasswordSelection(password)}
        />
      </div>
    </div>
  );
};
