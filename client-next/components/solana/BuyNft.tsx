import {useEffect, useState} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import idl from "../../types/video.json";
import {CONTRACT_ID, rpcUrl} from "../../config";
import Button from "@mui/material/Button";
import {PublicKey} from "@solana/web3.js";
import {TextField} from "@mui/material";
import * as React from "react";
import {BuyNftModal} from "../Modal/BuyNftModal";

export const BuyVideo = ({videoContractId}: {videoContractId: string}) => {
    const [auth, setAuth] = useState("");
    const [price, setPrice] = useState("");
    const [buyModal, setBuyModal] = useState(false);
    const { publicKey } = useWallet();

    const fetchDetails = async (id: string) => {
        //@ts-ignore
        const wallet = window.solana;
        const connection = new anchor.web3.Connection(rpcUrl, 'confirmed');
        anchor.setProvider(new anchor.Provider(connection, wallet, {commitment: "confirmed"}));
        //@ts-ignore
        const program = new anchor.Program(idl, CONTRACT_ID, anchor.getProvider());
        const account = await program.account.video.fetch(id);
        setAuth(account.authority.toBase58());
        setPrice(account.price.toString())
    }

    useEffect(() => {
        if (videoContractId) {
            fetchDetails(videoContractId);
        }
    }, [videoContractId]);

    return <>
        {publicKey?.toBase58() && auth !== publicKey?.toBase58() &&
        <>
            <Button variant={"contained"} size={"large"} color={"secondary"} onClick={() => setBuyModal(true)}>Buy for {price} SOL</Button>
            <BuyNftModal price={price} auth={auth} videoContractId={videoContractId} open={buyModal} onClose={() => setBuyModal(false)}></BuyNftModal>
        </>}
    </>
}

