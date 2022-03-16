import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TokenInstructions } from '@project-serum/serum';
import { Video } from '../../types/video';
import {CONTRACT_ID, rpcUrl} from "../../config";
import idl from "../../types/video.json";

export const createStreamOnChain = async (price: number) => {
    const connection = new anchor.web3.Connection(rpcUrl, 'confirmed');
    //@ts-ignore
    const wallet = window.solana;
    anchor.setProvider(new anchor.Provider(connection, wallet, {commitment: "confirmed"}));
    // @ts-ignore
    const program = new anchor.Program(idl, CONTRACT_ID, anchor.getProvider());
    let videoMint = anchor.web3.Keypair.generate();
    const tx = await program.rpc.initialize(new anchor.BN(price), {
        accounts: {
            user: anchor.getProvider().wallet.publicKey,
            videoAccount: videoMint.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        }, signers: [videoMint]
    });
    return videoMint.publicKey;
}