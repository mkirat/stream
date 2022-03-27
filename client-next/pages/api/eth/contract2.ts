import * as anchor from '@project-serum/anchor';
import {ETH_CONTRACT_ID} from "../../../config";
import abi from "../../../types/abi";
import Web3 from "web3"
var web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com'));

export const createStreamOnChain = async (account: string) => {
    var contract = new web3.eth.Contract(abi, ETH_CONTRACT_ID);
    const transactionParameters = {
        from: account,
        to: ETH_CONTRACT_ID,
        data: contract.methods.addStream(
            account
        ).encodeABI(),
        // gasPrice: '0x09184e72a000', // custom gas price
    };
    // popup - request the user to sign and broadcast the transaction
    const response = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    console.log(response);


}