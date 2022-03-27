import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import {Container, Box} from "@mui/material";
import {useWallet} from "@solana/wallet-adapter-react";
import {getStreams, Video} from "../api/videos";
import {VideoGrid} from "../../components/Landing/VideoGrid";
import Typography from "@mui/material/Typography";

interface Props {
    videos: Video[];
    id: string;
}

const Streams: NextPage<Props> = ({ videos, id }: Props) => {
    const wallet = useWallet();
    console.error(wallet);
    if (wallet.publicKey) {
        // console.error("inside1");
        // Router.push('/follow')
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Typography variant={"h6"}>
                    {id} owns {videos.length} videos
                </Typography>
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

export default Streams

export const getServerSideProps = async(ctx: any) => {
    const { query } = ctx;
    const { streams } = await getStreams({
        publicKey: query.id
    });
    console.log(streams);
    return {
        props: {
            videos: streams.map((stream: any) => ({
                title: stream.title,
                hasEnded: stream.hasEnded,
                description: stream.description,
                link: `/stream/${stream.id}`,
                thumbnail: stream.thumbnail,
                id: stream.id,
                userId: stream.userId
            })),
            id: query.id
        }
    }
}
