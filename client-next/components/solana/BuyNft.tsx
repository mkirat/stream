import {useEffect, useState} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import idl from "../../types/video.json";
import {CONTRACT_ID, rpcUrl} from "../../config";
import Button from "@mui/material/Button";
import {PublicKey} from "@solana/web3.js";
import {TextField} from "@mui/material";
import * as React from "react";

export const BuyVideo = ({videoContractId}: {videoContractId: string}) => {
    const [auth, setAuth] = useState("");
    const [price, setPrice] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [curMessage, setCurMessage] = useState("");

    const { publicKey } = useWallet()

    const fetchDetails = async (id: string) => {
        //@ts-ignore
        const wallet = window.solana;
        const connection = new anchor.web3.Connection(rpcUrl, 'confirmed');
        anchor.setProvider(new anchor.Provider(connection, wallet, {commitment: "confirmed"}));
        //@ts-ignore
        const program = new anchor.Program(idl, CONTRACT_ID, anchor.getProvider());
        const account = await program.account.video.fetch(id);
        setAuth(account.authority.toBase58());
        <br/>
        setPrice(account.price.toString())
        setCurMessage(account.message.text);
    }

    useEffect(() => {
        if (videoContractId) {
            fetchDetails(videoContractId);
        }
    }, [videoContractId]);

    const buy = async () => {
        //@ts-ignore
        const wallet = window.solana;
        const connection = new anchor.web3.Connection(rpcUrl, 'confirmed');
        anchor.setProvider(new anchor.Provider(connection, wallet, {commitment: "confirmed"}));
        //@ts-ignore
        const program = new anchor.Program(idl, CONTRACT_ID, anchor.getProvider());
        const tx = await program.rpc.buy(new anchor.BN(100), {text: newMessage, layout: 1}, {
            accounts: {
                videoAccount: new PublicKey(videoContractId),
                authority: new PublicKey(auth),
                buyer: publicKey as PublicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: new PublicKey(
                    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                )
            }, signers: []
        });
    }

    return <>
        {price}
        {auth}
        {curMessage}
        {publicKey?.toBase58() && auth !== publicKey?.toBase58() &&
            <>
                <TextField
                    label="Your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button size={"large"} variant={"contained"} onClick={buy}>Buy for {price} SOL</Button>
            </>}
    </>
}