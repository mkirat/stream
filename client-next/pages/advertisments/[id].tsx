import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import {Container, Box, Grid, TextField} from "@mui/material";
import {useWallet} from "@solana/wallet-adapter-react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {getStream, getVideos, Video} from "../api/videos";
import {VideoGrid} from "../../components/Landing/VideoGrid";
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import Typography from "@mui/material/Typography";
import {BuyVideo} from "../../components/solana/BuyNft";
import Button from "@mui/material/Button";
import {VideoCard} from "../../components/VideoCard";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import * as anchor from "@project-serum/anchor";
import {CONTRACT_ID, rpcUrl} from "../../config";
import idl from "../../types/video.json";
const ReactHlsPlayer = dynamic(() => import('../../components/ReactHlsPlayer'), {
    ssr: false,
})

interface Props {
    id: string;
}

const Stream: NextPage<Props> = ({ id }: Props) => {
    const { publicKey } = useWallet()
    const [text, setText] = useState("")

    useEffect(() => {
        window.setInterval(async () => {
            // @ts-ignore
            const wallet = window.solana;
            const connection = new anchor.web3.Connection(rpcUrl, 'confirmed');
            anchor.setProvider(new anchor.Provider(connection, wallet, {commitment: "confirmed"}));
            //@ts-ignore
            const program = new anchor.Program(idl, CONTRACT_ID, anchor.getProvider());
            const account = await program.account.video.fetch(id);
            setText(account.message.text);
        }, 7 * 1000)
    })

    return (
        <div style={{height: "100vh", width: "100vw", background: "transparent"}}>
            {text && <>
                <div style={{
                "position": "fixed",
                bottom:"0%",
                left:  "0%",
                width:"100%",
            }}>
                <img src={"/wave.png"} style={{width: 800}} />
            </div>
            <div style={{
                "position": "fixed",
                bottom:"0%",
                width:"100%",}}>
                <div style={{marginLeft: 10, fontSize: 40, marginBottom: 25}}>
                    {text}
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default Stream

export const getServerSideProps = async(ctx: any) => {
    const { query } = ctx;
    return {
        props: {
            id: query.id || "123"
        }
    }
}
