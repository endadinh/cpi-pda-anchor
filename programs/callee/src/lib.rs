use anchor_lang::prelude::*;

declare_id!("9MUGergwY55UxY79UCJv8tv5uDDCWqJ8bvnF5fEN54ox");

#[program]
pub mod callee {
    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        (*ctx.accounts.data).authority = ctx.accounts.authority.key();
        Ok(())
    }

    pub fn set_data(ctx: Context<SetData>, data: u64) -> Result<()> {
        (*ctx.accounts.data_acc).data = data;
        Ok(())
    }

}


#[derive(Accounts)]
pub struct Init<'info> {
    #[account(init, payer = payer,space = 8+ 32,)]
    pub data: Account<'info, Data>,
    #[account(mut)]
    pub payer: Signer<'info>,
    ///CHECK : data
    pub authority: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>
}
#[derive(Accounts)]
pub struct SetData<'info> {
    #[account(mut, has_one = authority)]
    ///CHECK : data
    pub data_acc: Account<'info, Data>,
    pub authority: Signer<'info>,
}

#[account]
#[derive(Default)]
pub struct Data {
    data: u64,
    authority: Pubkey,
}
