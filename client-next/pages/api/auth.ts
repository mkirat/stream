import axios from "axios";
import {apiUrl, LOCALSTORAGE_PREFIX, SIGNATURE_MESSAGE} from "../../config";
import {PublicKey} from "@solana/web3.js";
import bs58 from "bs58";
interface GetTokenProps {
    publicKey: PublicKey;
    message: string;
}

interface SignProps {
    signMessage: any;
    publicKey: PublicKey;
    originalMessage: string;
}

// In memory token
let token = "";
let expiry = Date.now();

export const fetchToken = async ({publicKey, message}: GetTokenProps) => {
    const response = await axios.get(`${apiUrl}/auth/token?publicKey=${publicKey.toBase58()}&message=${message}`)
    token = response.data.token
    expiry = Date.now() +  response.data.expiry
}

export const sign = async({signMessage, publicKey, originalMessage}: SignProps) => {
    if (!signMessage) {
        throw new Error("Wallet does not support message signing!");
    }
    // Encode anything as bytes
    const message = new TextEncoder().encode(originalMessage);
    // Sign the bytes using the wallet
    const signature = await signMessage(message);
    // Verify that the bytes were signed using the private key that matches the known public key
    // if (!sign.detached.verify(message, signature, publicKey.toBytes())) {
    //     throw new Error("Invalid signature!");
    // }
    await fetchToken({publicKey, message: bs58.encode(signature)});
}

interface SendAuthenticatedProps {
    fn: (...args: any) => Promise<any>;
    signMessage: any;
    publicKey: PublicKey;
}

export const sendAuthenticated = async ({fn, signMessage, publicKey}: SendAuthenticatedProps , ...args: any) => {
    if (!token || !expiry || Math.floor(expiry) > Date.now()) {
        await sign({
            signMessage,
            originalMessage: SIGNATURE_MESSAGE,
            publicKey
        });
    }
    const response =  await fn(...args);
    return response;
}

export const getToken = () => {
    return token;
}