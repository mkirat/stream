import type { NextPage } from 'next'
import Head from 'next/head'
import { defaultFollowWallets } from "../utils/defaultFollowWallets"
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Wallet} from "../components/solana/Wallet";
import {Container, Box, Grid, Button} from "@mui/material";
import {useWallet} from "@solana/wallet-adapter-react";
import Router from 'next/router'
import {VideoCard} from "../components/VideoCard";
import {AddFollowers} from "../components/AddFollowers";
import {useState} from "react";

const Home: NextPage = () => {
    const wallet = useWallet();
    const [addresses, setAddresses] = useState([""]);

    if (!wallet.publicKey) {
        Router.push('/')
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Follow</title>
            </Head>

            <main className={styles.main}>
                <Container  maxWidth="lg">
                    <Box sx={{ bgcolor: '#cfe8fc' }} >
                            <Grid container justifyContent={"center"} alignContent={"center"} spacing={2}>
                                {defaultFollowWallets.map((address, index) => <Grid key={index} item xs={12} md={4} lg={4}>
                                        <VideoCard address={address} />
                                </Grid>)}
                            </Grid>
                        <AddFollowers
                            addresses={addresses}
                            setAddresses={setAddresses}
                        />
                        {/*<Button onClick={follow_wallet_reset(addresses.splice(0, -1))}*/}
                    </Box>
                </Container>
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}

export default Home
