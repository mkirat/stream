import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

interface VideoCardProps {
    thumbnail: string;
    title: string;
    description: string;
    userId: string;
    date: number;
    id: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export const VideoCard = ({title, description, thumbnail, date, id, userId}: VideoCardProps) => {
    const router = useRouter()
    return (
        <Card onClick={() => router.push(`/stream/${id}`)}>
            <CardMedia
                style={{cursor: "pointer"}}
                component="img"
                height="194"
                image={thumbnail}
                alt="Paella dish"
            />
            <CardHeader
                avatar={
                    <Avatar onClick={() => router.push(`/streams/${userId}`)} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {(userId || "").substr(0, 1)}
                    </Avatar>
                }
                title={title}
                subheader={new Date(date).toDateString()}
            />
            <CardActions disableSpacing>
            </CardActions>
        </Card>
    );
}
