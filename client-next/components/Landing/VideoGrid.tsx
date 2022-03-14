import {Video} from "../../pages/api/videos";
import {VideoCard} from "../VideoCard";
import {Grid} from "@mui/material";

interface Props {
    videos: Video[];
}

export const VideoGrid = ({videos}: Props) => {
    return <Grid container spacing={3}>
        {videos.map((video, index) => <Grid key={index} item xs={12} md={4} lg={4}>
                <VideoCard id={video.id} thumbnail={video.thumbnail} title={video.title} description={video.description} date={video.uploadDate} />
            </Grid>
        )}
    </Grid>
}