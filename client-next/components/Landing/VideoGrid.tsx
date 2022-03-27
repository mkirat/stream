import {Video} from "../../pages/api/videos";
import {VideoCard} from "../VideoCard";
import {Grid} from "@mui/material";

interface Props {
    videos: Video[];
}

export const VideoGrid = ({videos}: Props) => {
    return <Grid container spacing={3}>
        {videos.filter(x => !x.hasEnded).map((video, index) => <Grid key={index} item xs={12} md={4} lg={4}>
                <VideoCard userId={video.userId} id={video.id} thumbnail={video.thumbnail} title={video.title} description={video.description} date={video.createdAt} />
            </Grid>
        )}
    </Grid>
}