use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Token, Mint};

declare_id!("8q3BujDbixVgFiytmTLUpHmXWDPTVapKgAx3Jwx54q7K");

#[program]
pub mod video {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, price: u64) -> ProgramResult {
        let video_account = &mut ctx.accounts.video_account;
        video_account.price = price;
        video_account.authority = ctx.accounts.user.clone().key();
        Ok(())
    }
    pub fn update(ctx: Context<Update>, price: u64, message: Message) -> ProgramResult {
        let video_account = &mut ctx.accounts.video_account;
        // if video_account.authority.to_string().as_str() == ctx.accounts.authority.key().to_string().as_str() {
            video_account.price = price;
            video_account.message = message;
        // } else {
            // return Err(ErrorCode::OwnerDidntMatchError.into());
        // }
        Ok(())
    }
    pub fn buy(ctx: Context<Buy>, price: u64, message: Message) -> ProgramResult {
        let video_account = &mut ctx.accounts.video_account;
        // Transfer money
        {
            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.buyer.key(),
                &ctx.accounts.authority.key(),
                video_account.price * 1000000000,
            );
            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.buyer.to_account_info(),
                    ctx.accounts.authority.to_account_info(),
                ],
            );
        }
        video_account.price = price;
        video_account.message = message;
        video_account.authority = ctx.accounts.buyer.clone().key();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space=8*8)]
    pub video_account: Account<'info, Video>,
    #[account(signer)]
    pub user: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    // #[account(mut, has_one = authority)]
    #[account(mut)]
    pub video_account: Account<'info, Video>,
    #[account(signer)]
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Buy<'info> {
    #[account(mut)]
    pub video_account: Account<'info, Video>,
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    #[account(signer)]
    pub buyer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: AccountInfo<'info>,
}

#[account]
pub struct Video {
    pub price: u64,
    pub authority: Pubkey,
    pub message: Message
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct Message {
    pub text: String,
    pub layout: u8,
}

//
// #[error_code]
// pub enum ErrorCode {
//     #[msg("User must own the Video to update it")]
//     OwnerDidntMatchError,
// }
