import {useState} from "react";
import {Modal} from "./index";
import Web3 from "web3"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Chip, TextField} from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import {createStreamOnChain} from "../../pages/api/contract";
import {sendAuthenticated} from "../../pages/api/auth";
import {createStream} from "../../pages/api/videos";
import * as React from "react";
import * as anchor from "@project-serum/anchor";
import {CONTRACT_ID, ETH_CONTRACT_ID, rpcUrl} from "../../config";
import idl from "../../types/video.json";
import {PublicKey} from "@solana/web3.js";
import {useWallet} from "@solana/wallet-adapter-react";
import LoadingButton from '@mui/lab/LoadingButton';
import abi from "../../types/abi";
import useMetaMask from "../eth/useMetamask";
import {useWeb3React} from "@web3-react/core";

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


export const BuyNftModal = ({videoContractId, open, onClose, account }: {account: string; videoContractId: string; open: boolean; onClose:() => void; }) => {
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(false);
    const [buyInProgress, setBuyInProgress] = useState(false);
    const [bought, setBought] = useState(false);
    const { connector} = useWeb3React()

    const buy = async () => {
        setBuyInProgress(true)
        setError(false);
        setBought(false);
        try {
            console.log(connector)
            const web3Eth = new Web3(await connector?.getProvider());
            const contract = new web3Eth.eth.Contract(abi, ETH_CONTRACT_ID);
            const accounts = await web3Eth.eth.getAccounts();
            const response = await new Promise((resolve, reject) => {
                contract.methods.sendMessage(videoContractId, newMessage, updatedPrice * 1000000000).send({
                    from: accounts[0], value: (updatedPrice * 1000000000000000000).toString()
                })
                .on('receipt', function(receipt) {
                    resolve(receipt.events["MessageAdded"])
                })
            })
            console.error(response.returnValues["_message"]);
            setBought(true);
            window.setTimeout(() => {
                onClose();
            }, 2000)
        } catch(e) {
            console.error(e)
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
                Send Superchat
            </Typography>
            <CssTextField
                sx={{input: {color: "white"}}}
                style={{margin: 10, color: "white"}}
                fullWidth
                label="Your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <br/><br/>
            <div style={{marginLeft: 5, marginBottom: 3, display: "flex", justifyContent: "center"}}>
                <Chip label={"1 MATIC"} color={"primary"} onClick={() => setUpdatedPrice("1")}>
            </Chip>

            <Chip color={"primary"} label={"3 MATIC"} onClick={() => setUpdatedPrice("3")}>
                5 MATIC
            </Chip>

            <Chip color={"primary"} label={"10 MATIC"} onClick={() => setUpdatedPrice("10")}>
                10 MATIC
            </Chip>
            </div>


            <CssTextField
                sx={{input: {color: "white"}}}
                style={{margin: 10}}
                fullWidth
                label="Amount"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <br/><br/>
            <div style={{display: "flex", justifyContent : "center"}}>
                <Button variant={"contained"} size={"large"} color={"secondary"} onClick={buy}>Send superchat</Button>
            </div>
            <br/>
            {bought && <Alert severity="success">Success! Your message should appear on the video soon.</Alert>}
            {error && <Alert severity="warning">Error while transacting, please try again.</Alert>}
        </Box>
    </Modal>
}