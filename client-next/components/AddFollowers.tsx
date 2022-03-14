import React, {useState} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {TextField, Container} from "@mui/material";

export const AddFollowers = ({addresses, setAddresses}: any) => {
    const { publicKey } = useWallet();

    return (
        <>
            {addresses.map((address: string, index: number) =><Container spacing={1}>
                <TextField onChange={(e =>{
                setAddresses((ads: string[]) => {
                    const updatedAddresses = ads.map((ad: string, index2: number) => {
                        if (index2 === index) {
                            return e.target.value
                        }
                        return ad;
                    }).filter(x => x);
                    updatedAddresses.push("");
                    return updatedAddresses;
                });
            })} value={address} id="outlined-basic" label="Address" variant="outlined" /> <br/>
            </Container>)}
        </>
    );
};