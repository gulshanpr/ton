"use client";
import { useEffect, useState, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

export default function Home() {
  const [tonconnect] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("wallet connected", address);
    setLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("wallet disconnected");
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonconnect.account?.address) {
        handleWalletConnection(tonconnect.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonconnect.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account?.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonconnect, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonconnect.connected) {
      setLoading(true);
      await tonconnect.disconnect();
    } else {
      await tonconnect.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect TON Wallet
        </button>
      )}
    </main>
  );
}
