import type { NextPage } from 'next'
import {useWallet} from "@solana/wallet-adapter-react";
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import * as anchor from "@project-serum/anchor";
import {CONTRACT_ID, ETH_CONTRACT_ID, rpcUrl} from "../../config";
import idl from "../../types/video.json";
import Web3 from "web3";
import abi from "../../types/abi";

interface Props {
    id: string;
}

const Stream: NextPage<Props> = ({ id }: Props) => {
    const { publicKey } = useWallet()
    const [text, setText] = useState("")

    const init = async() => {
        const web3Eth = new Web3();
        web3Eth.setProvider("wss://polygon-mumbai.g.alchemy.com/v2/03abtA8uQ3HyQKFJmXXpXOb60hytjeEc");
        const contract = new web3Eth.eth.Contract(abi, ETH_CONTRACT_ID);

        contract.events.MessageAdded({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error, event){ console.log(error); console.log(event); })
            .on('data', function(event){
                console.log(event); // same results as the optional callback above
                if (event.returnValues["_streamId"] == id) {
                    setText(event.returnValues["_message"])
                    setTimeout(() => {
                        setText("");
                    }, 7000)
                }
            })
    }
    useEffect(() => {
        init()
    }, [])

    return (
        <div style={{height: "100vh", width: "100vw", background: "transparent"}}>
            {text && <>
                <div style={{
                "position": "fixed",
                bottom:"0%",
                left:  "0%",
                width:"100%",
            }}>
                <img src={"/wave.png"} style={{width: 800}} />
            </div>
            <div style={{
                "position": "fixed",
                bottom:"0%",
                width:"100%",}}>
                <div style={{marginLeft: 10, fontSize: 40, marginBottom: 25}}>
                    {text}
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default Stream

export const getServerSideProps = async(ctx: any) => {
    const { query } = ctx;
    return {
        props: {
            id: query.id || "123"
        }
    }
}
