import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import {Container, Box, Grid, TextField} from "@mui/material";
import {useWallet} from "@solana/wallet-adapter-react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {createStream, endStream, getStream, getVideos, Video} from "../api/videos";
import {VideoGrid} from "../../components/Landing/VideoGrid";
import {useRef} from "react";
import dynamic from "next/dynamic";
import Typography from "@mui/material/Typography";
import {BuyVideo} from "../../components/solana/BuyNft";
import Button from "@mui/material/Button";
import {VideoCard} from "../../components/VideoCard";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useMetaMask from "../../components/eth/useMetamask";
import {frontendUrl} from "../../config";
import {CssTextField} from "../../components/Modal/BuyNftModal";
import {endStreamOnChain} from "../api/eth/contract";
import {useRouter} from "next/router";
import {useWeb3React} from "@web3-react/core";
const ReactHlsPlayer = dynamic(() => import('../../components/ReactHlsPlayer'), {
    ssr: false,
})

interface Props {
    hlsUrl: string;
    title: string;
    hasEnded: string;
    description: string;
    id: string;
    videos: Video[];
    rtmpUrl: string;
    streamKey: string;
    userId: string;
}

const Stream: NextPage<Props> = ({ hlsUrl, title, description, id, videos, rtmpUrl, streamKey, userId, hasEnded }: Props) => {
    const { account } = useMetaMask()
    const router = useRouter();
    const { connector } = useWeb3React()

    if (hasEnded) {
        return <div className={styles.container}>
            <div className={styles.main}>
                <h1>
                    This stream has ended ...
                </h1>
                <Button size={"large"} color={"secondary"} variant={"contained"} onClick={() => router.push("/")}>
                    Home
                </Button>
                <br/><br/><br/><br/>
            </div>
        </div>
    }

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
                            url={hlsUrl}
                        />
                        <div style={{display: "flex"}}>
                            <div style={{flexGrow: 1, marginLeft: 0}}>
                                <Typography variant={"h4"}>
                                    {title}
                                </Typography>
                                <Typography variant={"subtitle1"}>
                                    {description}
                                </Typography>
                            </div>
                            <div style={{marginTop: 4}}>
                                <BuyVideo videoContractId={id} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} sm={12} spacing={3}>
                        {userId === account && <Box style={{background: `linear-gradient(to right, #0f2027, #130f40)`, color: "#dff9fb"}}>
                            <div style={{display: "flex", justifyContent: "space-between", padding: 14}}>
                                <div>
                                    <Typography variant={"h5"}>
                                        Stream Credentials
                                    </Typography>
                                </div>
                                <div>
                                    <Button color={"secondary"} variant={"contained"} onClick={async () => {
                                        await endStreamOnChain(id, await connector?.getProvider());
                                        // @ts-ignore
                                        await endStream({
                                            videoContractId: id,
                                            account
                                        });
                                        router.push(`/`)
                                    }}>
                                        End Stream
                                    </Button>
                                </div>
                            </div>
                            <CardMedia>

                                {/*
                // @ts-ignore */}
                                {userId === account && <CssTextField sx={{input: {color: "white"}}} style={{padding: 10}} fullWidth label={"RTMP URL"} value={rtmpUrl} />}
                                <br/>

                                {/*
                                // @ts-ignore */}
                                {userId === account && <CssTextField sx={{input: {color: "white"}}} style={{padding: 10}} fullWidth label={"Stream Key"} value={streamKey} />}

                                {userId === account && <CssTextField sx={{input: {color: "white"}}} style={{padding: 10}} fullWidth label={"OBS URL"} value={`${frontendUrl}/advertisments/${id}`} />}
                            </CardMedia>
                        </Box>}
                        {videos.map((video, index) => <div key={index} style={{margin: 30}}> <VideoCard key={video.id} thumbnail={video.thumbnail} title={video.title} description={video.description} userId={video.userId} date={video.createdAt} id={video.id}/> </div>)}
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
    const { hlsUrl, title, description, rtmpUrl, streamKey, userId, hasEnded } = await getStream({
        videoContractId: query.id
    });

    const videos = await getVideos();

    return {
        props: {
            hlsUrl, title, description, id: query.id, videos, rtmpUrl: rtmpUrl || "", streamKey: streamKey || "", userId: userId || "", hasEnded: hasEnded || false
        }
    }
}
