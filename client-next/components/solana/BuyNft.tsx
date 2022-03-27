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
import useMetaMask from "../eth/useMetamask";

export const BuyVideo = ({videoContractId}: {videoContractId: string}) => {
    const [auth, setAuth] = useState("");
    const [price, setPrice] = useState("");
    const [buyModal, setBuyModal] = useState(false);
    const { account } = useMetaMask();

    useEffect(() => {

    }, [videoContractId]);

    return <>
        {account &&
        <>
            <Button variant={"contained"} size={"large"} color={"secondary"} onClick={() => setBuyModal(true)}>Superchat</Button>
            <BuyNftModal account={account} videoContractId={videoContractId} open={buyModal} onClose={() => setBuyModal(false)}></BuyNftModal>
        </>}
    </>
}

