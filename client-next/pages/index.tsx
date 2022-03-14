import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Wallet} from "../components/solana/Wallet";
import {Container, Box} from "@mui/material";
import Router from "next/router";
import {useWallet} from "@solana/wallet-adapter-react";
import {getVideos, Video} from "./api/videos";
import {VideoGrid} from "../components/Landing/VideoGrid";

interface Props {
    videos: Video[];
}

const Home: NextPage<Props> = ({ videos }: Props) => {
    const wallet = useWallet();
    console.error(wallet);
    if (wallet.publicKey) {
        // console.error("inside1");
        // Router.push('/follow')
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>Stream it</title>
        <meta name="description" content="Stream it" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          StreamIt!
          <Container maxWidth="xl">
              <VideoGrid videos={videos} />
           </Container>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps = async() => {
    const videos = await getVideos();
    return {
        props: {
            videos
        }
    }
}