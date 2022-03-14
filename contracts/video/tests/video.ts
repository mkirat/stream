import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TokenInstructions } from '@project-serum/serum';
import { Video } from '../target/types/video';
import * as assert from "assert";

describe('video', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Video as Program<Video>;
  let videoMint = anchor.web3.Keypair.generate();
  let user = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    const provider = anchor.getProvider();
    await provider.connection.requestAirdrop(user.publicKey, 2 * 1000000000)
    const response = await provider.connection.getAccountInfo(user.publicKey);
    const tx = await program.rpc.initialize(new anchor.BN(3), {
      accounts: {
        user: provider.wallet.publicKey,
        videoAccount: videoMint.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }, signers: [videoMint]
    });
    const account = await program.account.video.fetch(videoMint.publicKey);
    assert.ok(account.message.text === '')
    assert.ok(account.message.layout === 0)
    assert.ok(parseInt(account.price.toString()) === 3)
  });

  it('Is updated!', async () => {
    const provider = anchor.getProvider();
    // await provider.connection.requestAirdrop(user.publicKey, 2 * 1000000000)
    // const response = await provider.connection.getAccountInfo(user.publicKey);
    const tx = await program.rpc.update(new anchor.BN(1), {text: "Hi", layout: 1}, {
      accounts: {
        videoAccount: videoMint.publicKey,
        authority: user.publicKey
      }, signers: [user]
    });
    const account = await program.account.video.fetch(videoMint.publicKey);
    assert.ok(account.message.text === 'Hi')
    assert.ok(account.message.layout === 1)
    assert.ok(parseInt(account.price.toString()) === 1)
  });

  it('Is bought!', async () => {
    const provider = anchor.getProvider();
    // await provider.connection.requestAirdrop(user.publicKey, 2 * 1000000000)
    // const response = await provider.connection.getAccountInfo(user.publicKey);
    const tx = await program.rpc.buy(new anchor.BN(100), {text: "Hi fr", layout: 1}, {
      accounts: {
        videoAccount: videoMint.publicKey,
        authority: user.publicKey,
        buyer: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID
      }, signers: [user]
    });
    const account = await program.account.video.fetch(videoMint.publicKey);
    assert.ok(account.message.text === 'Hi fr')
    assert.ok(account.message.layout === 1)
    assert.ok(parseInt(account.price.toString()) === 100)
  });

});
