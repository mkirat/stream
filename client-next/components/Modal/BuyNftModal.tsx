import {useState} from "react";
import {Modal} from "./index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, TextField} from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import {createStreamOnChain} from "../../pages/api/contract";
import {sendAuthenticated} from "../../pages/api/auth";
import {createStream} from "../../pages/api/videos";
import * as React from "react";
import * as anchor from "@project-serum/anchor";
import {CONTRACT_ID, rpcUrl} from "../../config";
import idl from "../../types/video.json";
import {PublicKey} from "@solana/web3.js";
import {useWallet} from "@solana/wallet-adapter-react";
import LoadingButton from '@mui/lab/LoadingButton';

export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#dff9fb',
    },
    '& label': {
        color: '#dff9fb',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

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


export const BuyNftModal = ({videoContractId, price, open, onClose, auth }: {auth: string; videoContractId: string; price: string;open: boolean; onClose:() => void; }) => {
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(false);
    const [buyInProgress, setBuyInProgress] = useState(false);
    const [bought, setBought] = useState(false);
    const { publicKey } = useWallet()

    const buy = async () => {
        setBuyInProgress(true)
        setError(false);
        setBought(false);
        try {
            //@ts-ignore
            const wallet = window.solana;
            const connection = new anchor.web3.Connection(rpcUrl, 'confirmed');
            anchor.setProvider(new anchor.Provider(connection, wallet, {commitment: "confirmed"}));
            //@ts-ignore
            const program = new anchor.Program(idl, CONTRACT_ID, anchor.getProvider());
            const tx = await program.rpc.buy(new anchor.BN(parseInt(updatedPrice)), {text: newMessage, layout: 1}, {
                accounts: {
                    videoAccount: new PublicKey(videoContractId),
                    authority: new PublicKey(auth),
                    buyer: publicKey as PublicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: new PublicKey(
                        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                    )
                }, signers: []
            });
            setBought(true);
            window.setTimeout(() => {
                onClose();
            }, 2000)
        } catch(e) {
            setError(true);
        }
        setBuyInProgress(false)
    }

    return  <Modal
        onClose={onClose}
        open={open}
    >
        <Box style={{background: `linear-gradient(to right, #0f2027, #130f40)`, color: "#dff9fb"}} sx={style}>
            <Typography variant={"h5"} style={{margin: 5}}>
                Buy
            </Typography>
            <CssTextField
                sx={{input: {color: "white"}}}
                style={{margin: 10, color: "white"}}
                fullWidth
                label="Your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <CssTextField
                sx={{input: {color: "white"}}}
                style={{margin: 10}}
                fullWidth
                label="Price for next buy"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <br/><br/>
            <div style={{display: "flex", justifyContent : "center"}}>
                <Button variant={"contained"} size={"large"} color={"secondary"} onClick={buy}>Buy for {price} SOL</Button>
            </div>
            <br/>
            {bought && <Alert severity="success">Success! Your message should appear on the video soon.</Alert>}
            {error && <Alert severity="warning">Error while transacting, please try again.</Alert>}
        </Box>
    </Modal>
}