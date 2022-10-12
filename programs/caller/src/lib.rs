// Caller Program

use anchor_lang::prelude::*;
use callee::cpi::accounts::SetData;
use callee::{self, program::Callee, DataCallee};
declare_id!("2nUxAVo7aSEMeAapkKDJvms1r4TQotQj51ociCBJ5cDP");

#[program]
pub mod caller {

    use super::*;
    pub fn do_cpi_with_pda_authority(ctx: Context<DoCpiWithPDAAuthority>, data: u8) -> Result<()> {
        let callee = &ctx.accounts.callee;
        let seeds: &[&[_]] = &[&SIGNER_SEED_1, &[callee.signer_nonce]];
        msg!("Seeds :{:?}", seeds);
        callee::cpi::set_data(ctx.accounts.set_data_ctx().with_signer(&[seeds]), data)
    }
}

#[derive(Accounts)]
pub struct DoCpiWithPDAAuthority<'info> {
    pub callee_program: Program<'info, Callee>,
    pub callee: Account<'info, DataCallee>,
    pub system_program: Program<'info, System>,
}

impl<'info> DoCpiWithPDAAuthority<'info> {
    pub fn set_data_ctx(&self) -> CpiContext<'_, '_, '_, 'info, SetData<'info>> {
        let cpi_program = self.callee_program.to_account_info();
        let cpi_accounts = SetData {
            callee: self.callee.to_account_info(),
            system_program: self.system_program.to_account_info(),
        };
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

pub const SIGNER_SEED_1: &[u8] = &[102, 151, 229, 53, 244, 77, 229, 11];
