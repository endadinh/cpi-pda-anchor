import { Callee } from './../target/types/callee';
import { Caller } from './../target/types/caller';
import { BN } from "bn.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from 'chai';
import { SolanaConfigService } from "@coin98/solana-support-library/config";
import {
  ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TokenProgramInstructionService,
  TokenProgramService,
  TOKEN_PROGRAM_ID,
  SystemProgramService
} from "@coin98/solana-support-library";
import { createProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';


describe("callee", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Callee as Program<Callee>;
  const callerProgram = anchor.workspace.Caller as Program<Caller>;
  const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  it('Does CPI!', async () => {
    const seedsArr = [102, 151, 229, 53, 244, 77, 229, 11];

    const seeds = Buffer.from(seedsArr)
    const [calleeMasterPDA, calleeMasterBump] =
      await anchor.web3.PublicKey.findProgramAddress([seeds], program.programId);
    const mainAccount = await SolanaConfigService.getDefaultAccount();
    const system_program = await anchor.web3.SystemProgram.programId;
    try {
      const tx = await program.methods
        .init()
        .accounts({
          owner: mainAccount.publicKey,
          callee: calleeMasterPDA,
          systemProgram: system_program,

        })
        .signers([mainAccount])
        .rpc()
      console.log('tx_here', tx);
    }
    catch (error) {
      console.log('error,', error)
    }

    try {
      const tx = await callerProgram.methods
        .doCpiWithPdaAuthority(8)
        .accounts({
          calleeProgram: program.programId,
          callee: calleeMasterPDA,
          systemProgram: system_program,
        })
        .rpc()

      console.log('tx_here', tx)
    }
    catch (error) {
      console.log('error', error)
    }
  })
})