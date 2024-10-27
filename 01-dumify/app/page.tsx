"use client";

import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { ConnectButton } from "arweave-wallet-kit";
import { useState } from "react";

export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [dumifiedText, setDumifiedText] = useState("");
  const dumifyProcess = "Y7Iz4VDomKOmEPbuGPMQCI-rIvGc5huIaQjgF2k7DdQ";

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const sendAOMessage = async () => {
    const response = await message({
      process: dumifyProcess,
      tags: [
        {
          name: "Action",
          value: "Dumify",
        },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
      data: userMessage,
    });
    const res = await result({
      message: response,
      process: dumifyProcess,
    });
    setDumifiedText(res.Messages[0].Data);
  };

  return (
    <div className="flex flex-col items-center h-screen p-8 gap-4">
      <h1 className="text-4xl font-bold">Dumify</h1>
      <ConnectButton />
      <input
        type="text"
        placeholder="Normal text goes here..."
        value={userMessage}
        onChange={handleMessageChange}
        className="p-2 border border-gray-300 rounded-md text-black"
      />
      <button onClick={sendAOMessage}>Dumify!</button>
      <p>{dumifiedText || ""}</p>
    </div>
  );
}
