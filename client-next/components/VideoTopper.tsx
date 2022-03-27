import dynamic from "next/dynamic";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";

const ReactHlsPlayer = dynamic(() => import('../components/ReactHlsPlayer'), {
    ssr: false,
});


interface Props {
    thumbnail: string;
    id: string;
    title: string;
    description: string;
    userId: string;
    date: number;
}

export const VideoTopper = ({title, description, id}:  Props) => {
    const router = useRouter();
    return (
        <Container style={{border: "1px solid gray", borderRadius: 10, margin: 20, padding: 30}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Typography variant={"h4"} style={{margin: 30}}>
                    Spotlight
                </Typography>
            </div>
            <ReactHlsPlayer
                url="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
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
                <Button variant={"contained"} size={"large"} color={"secondary"} onClick={() => router.push(`/stream/${id}`)}>Go</Button>
                </div>
            </div>
        </Container>
    )
}