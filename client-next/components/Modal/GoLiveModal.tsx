import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal } from './index';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {sendAuthenticated} from "../../pages/api/auth";
import {useWallet} from "@solana/wallet-adapter-react";
import {createStream} from "../../pages/api/videos";
import {PublicKey} from "@solana/web3.js";
import {useState} from "react";
import {TextField} from "@mui/material";
import {createStreamOnChain} from "../../pages/api/contract";
import {useRouter} from "next/router";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean;
    onClose: () => void;
}

export const GoLiveModal = ({open, onClose}: Props) => {
    const { publicKey, signMessage } = useWallet();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState("https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg")
    const router = useRouter();
    return <Modal
        onClose={onClose}
        open={open}
    >
        <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Go live
            </Typography>

            <Box>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
                label="Thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
            />
        </Box>
            <Button variant={"outlined"} onClick={async () => {
                const videoContractId = await createStreamOnChain();

                const response = await sendAuthenticated({fn: createStream, signMessage, publicKey},{
                    title,
                    description ,
                    thumbnail,
                    videoContractId,
                })
                router.push(`/stream/${videoContractId}`)
            }}>Go Live</Button>
        </Box>
    </Modal>
}