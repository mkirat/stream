import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import {Container, Box, Grid} from "@mui/material";
import {useWallet} from "@solana/wallet-adapter-react";
import {getStream, Video} from "../api/videos";
import {VideoGrid} from "../../components/Landing/VideoGrid";
import {useRef} from "react";
import dynamic from "next/dynamic";
import Typography from "@mui/material/Typography";
import {BuyVideo} from "../../components/solana/BuyNft";
const ReactHlsPlayer = dynamic(() => import('../../components/ReactHlsPlayer'), {
    ssr: false,
})

interface Props {
    hlsUrl: string;
    title: string;
    description: string;
    id: string;
}

const Stream: NextPage<Props> = ({ hlsUrl, title, description, id }: Props) => {
    const wallet = useWallet();
    const playerRef = useRef<HTMLVideoElement>();

    return (
        <div className={styles.container}>
            <Head>
                <title>Stream it</title>
                <meta name="description" content="Stream it" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Grid container spacing={2}>
                    <Grid item lg={9} sm={12}>
                        <ReactHlsPlayer
                            url="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                        />
                        <Typography variant={"h2"}>
                            {title}
                        </Typography>
                        <Typography variant={"h5"}>
                            {description}
                        </Typography>
                        <BuyVideo videoContractId={id} />
                    </Grid>
                </Grid>
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}

export default Stream

export const getServerSideProps = async(ctx: any) => {
    const { query } = ctx;
    const { hlsUrl, title, description } = await getStream({
        videoContractId: query.id
    });

    return {
        props: {
            hlsUrl, title, description, id: query.id
        }
    }
}
