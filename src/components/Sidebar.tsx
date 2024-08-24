import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import useSidebarStore from "@/store/client";
import { useRouter } from "next/navigation";
import useStore, { Account } from "@/store/store";
// import Tooltip from "./Tooltip";
// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })
const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebarStore();
  const router = useRouter();
  const { accounts, setCurrentAccount } = useStore();

  // Get the first character and convert it to uppercase
  const getInitial = (name: string): string => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const handleAddAccount = () => {
    router.push("/create-account");
    toggle()
  };
  const handleSetCurrentAccount = (account: Account) => {
    setCurrentAccount(account);
    toggle()
  };

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: -500, left: 0 });

  const handleMouseEnter = (
    accountName: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setTooltipText(accountName);
    setTooltipVisible(true);
    const { clientX, clientY } = event;
    setTooltipPosition({ top: clientY + 10, left: clientX }); 
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className={`w-24 h-screen bg-[#0e0f14ff] text-white transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Accounts Section */}
      <div className="min-h-[50%]">
        <h2
          className="text-lg text-center m-auto bg-[#14151bff] hover:bg-white hover:text-black cursor-pointer rounded w-10 p-2 font-semibold my-4"
          onClick={toggle}
        >
          <IoIosArrowRoundBack size={24} />
        </h2>
        <div className="space-y-4 ">
          {accounts.map((account, index) => (
            <div
              onMouseEnter={(e) => handleMouseEnter(account.name, e)} // Show tooltip on hover
              onMouseLeave={handleMouseLeave} // Hide tooltip on mouse leave
              key={index}
              onClick={() => handleSetCurrentAccount(account)}
              className="flex cursor-pointer flex-col w-24 items-center justify-center transition-transform duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#14151bff] rounded-full text-lg font-bold transition-colors duration-200 hover:bg-gray-600">
                {getInitial(account.name)}
              </div>
              <span className="text-xs mt-1 transition-colors duration-200">
                {account.name}
              </span>
              {/* <Tooltip text={tooltipText} visible={tooltipVisible} style={{ top: tooltipPosition.top, left: tooltipPosition.left }} /> */}
            </div>
          ))}
        </div>
      </div>
      {/* Add Account Section */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleAddAccount}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e84548ff] hover:bg-gray-600 transition duration-200"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
