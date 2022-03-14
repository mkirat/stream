import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Wallet = () => {
    const { publicKey } = useWallet();

    return (
        <>
            {!publicKey && <WalletMultiButton />}
            {publicKey && <WalletDisconnectButton />}
        </>
    );
};