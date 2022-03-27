import * as anchor from '@project-serum/anchor';
import {ETH_CONTRACT_ID} from "../../../config";
import abi from "../../../types/abi";
import Web3 from "web3"

export const createStreamOnChain = async (account: string, provider) => {
    var web3Eth = new Web3(provider);
    var contract = new web3Eth.eth.Contract(abi, ETH_CONTRACT_ID);
    var accounts = await web3Eth.eth.getAccounts();
    const response = await new Promise((resolve, reject) => {
        contract.methods.addStream().send({
            from: accounts[0]
        }).on('receipt', function(receipt){
            resolve(receipt.events["StreamCreated"].returnValues["index"])
        })
    })
    return response;

}


export const endStreamOnChain = async (stream_id: string, provider) => {
    var web3Eth = new Web3(provider);
    var contract = new web3Eth.eth.Contract(abi, ETH_CONTRACT_ID);
    var accounts = await web3Eth.eth.getAccounts();
    const response = await new Promise((resolve, reject) => {
        contract.methods.endStream(stream_id).send({
            from: accounts[0]
        }).on('receipt', function(receipt){
            resolve()
        })
    })
    return response;
}