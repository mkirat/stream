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
import {CssTextField} from "./BuyNftModal";

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

//TODO: Fix thumbnail generation logic
export const GoLiveModal = ({open, onClose}: Props) => {
    const { publicKey, signMessage } = useWallet();
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(1);
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState(`/thumb-${Math.floor(Math.random() * 7) + 1}.jpeg`)
    const router = useRouter();
    return <Modal
        onClose={onClose}
        open={open}
    >
        <Box style={{background: `linear-gradient(to right, #0f2027, #130f40)`, color: "#dff9fb"}} sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Go live
            </Typography>
            <Box>
            <CssTextField
                sx={{input: {color: "white"}}}
                style={{margin: 3}}
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

                <CssTextField
                    sx={{input: {color: "white"}}}
                    style={{margin: 3}}
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            <CssTextField
                sx={{input: {color: "white"}}}
                style={{margin: 3}}
                fullWidth
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
        </Box>
            <br/>
            <div style={{display: "flex",  justifyContent: "center"}}>
            <Button variant={"contained"} color={"secondary"} onClick={async () => {
                const videoContractId = await createStreamOnChain(price);
                // @ts-ignore
                const response = await sendAuthenticated({fn: createStream, signMessage, publicKey},{
                    title,
                    description ,
                    thumbnail,
                    videoContractId,
                })
                onClose();
                router.push(`/stream/${videoContractId}`)
            }}>Go Live</Button>
            </div>
        </Box>
    </Modal>
}