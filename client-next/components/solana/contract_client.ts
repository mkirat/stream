import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { NftNotifierContract } from './types/nft_notifier_contract';
import { Connection, PublicKey, clusterApiUrl, Keypair } from "@solana/web3.js";
import idl from "./idl/nft_notifier_contract.json";
const programID = new PublicKey(idl.metadata.address);

const { SystemProgram } = anchor.web3;

describe('nft-notifier-contract', () => {

    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env());
    const program = anchor.workspace.NftNotifierContract as Program<NftNotifierContract>;

    it('Is initialized!', async () => {
        // Add your test here.
        const myAccount = Keypair.fromSecretKey(Uint8Array.from([181,212,142,110,64,172,81,120,111,68,202,226,223,92,149,30,97,190,245,120,61,57,221,170,38,174,95,191,12,134,82,63,93,123,113,33,5,136,16,182,207,124,93,192,41,80,17,110,106,2,92,206,32,209,93,37,108,255,227,75,159,135,61,162]));
        const baseAccount = Keypair.generate();

        const tx = await program.rpc.startStuffOff({
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: myAccount.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [baseAccount, myAccount],
        })
        const tx2 = await program.rpc.followWallet(["H5uT65z7DiTmPEdFS2ZVNM2T5ZZ5aexdCzNBdpGUTAoG"], {
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: myAccount.publicKey,
            },
            signers: [myAccount],
        });
        console.log("Your transaction signature", tx);
        console.log(tx2);

        const account = await program.account.baseAccount.fetch(
            baseAccount.publicKey
        );

    });
});


export const follow_wallet_reset = (addresses: string[]) => {

}