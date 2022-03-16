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
import {VideoCard} from "../components/VideoCard";
import {VideoTopper} from "../components/VideoTopper";

interface Props {
    videos: Video[];
    spotlight?: Video;
}

const Home: NextPage<Props> = ({ videos, spotlight }: Props) => {
    return (
    <div className={styles.container}>
      <main className={styles.main}>
          {spotlight && <VideoTopper thumbnail={spotlight.thumbnail} title={spotlight.title} description={spotlight.description} userId={spotlight.userId} date={spotlight.createdAt} id={spotlight.id} />}
          <br/>
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
            videos,
            spotlight: videos[0] || {}
        }
    }
}