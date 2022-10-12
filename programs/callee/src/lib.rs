use anchor_lang::prelude::*;

declare_id!("5McdVWZNcS21UEeCQpfigSB9XLeXo3nz98159LN5Yt9");

#[program]
pub mod callee {
    use super::*;

    pub fn init(_ctx: Context<Initialize>,) -> Result<()> {
      let owner = &_ctx.accounts.owner;
      let callee = &mut _ctx.accounts.callee;
      let (_, signer_nonce) = Pubkey::find_program_address(
        &[
          SIGNER_SEED_1,
          &callee.key().to_bytes(),
        ],
        _ctx.program_id,
      );
      callee.signer_nonce = signer_nonce;
      callee.owner = *owner.key;
        Ok(())
    }

    pub fn set_data(_ctx: Context<SetData>, data: u8) -> Result<()> {
      let callee = &mut _ctx.accounts.callee;
      callee.data = data;
     Ok(())
  }
}
#[derive(Accounts)]
pub struct Initialize<'info> {
  #[account(signer,mut)]
  /// CHECK:` doc comment explaining why no checks through types are necessary.
  pub owner: AccountInfo<'info>,
    #[account( init,
      payer = owner,
      space = 16 + 40,
      seeds = [  
      &SIGNER_SEED_1, 
      ],
      bump
    )]
    pub callee: Account<'info, DataCallee>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetData<'info> {
  pub callee: Account<'info, DataCallee>,
  pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct DataCallee {
  pub owner: Pubkey,
  pub signer_nonce: u8,
  pub data : u8,
}

pub const SIGNER_SEED_1: &[u8] = &[102, 151, 229, 53, 244, 77, 229, 11];

