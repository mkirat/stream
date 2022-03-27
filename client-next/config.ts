import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const network = WalletAdapterNetwork.Mainnet;
export const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/v1";
export const LOCALSTORAGE_PREFIX = "str";
export const SIGNATURE_MESSAGE = process.env.REACT_APP_SIGNATURE_MESSAGE || "Please sign this message to continue to streamit";
export const rpcUrl = "https://api.devnet.solana.com";
export const CONTRACT_ID = "8q3BujDbixVgFiytmTLUpHmXWDPTVapKgAx3Jwx54q7K";
export const ETH_CONTRACT_ID = "0xB2AF8227A5b2257848A57122D62646F6471837b1"
export const frontendUrl = "http://localhost:3000"
