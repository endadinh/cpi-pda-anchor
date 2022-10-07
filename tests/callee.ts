import { BN } from "bn.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Caller }  from "../target/types/caller";
import { Callee } from '../target/types/callee';
import { SolanaConfigService } from "@coin98/solana-support-library/config";
import {
  ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TokenProgramInstructionService,
  TokenProgramService,
  TOKEN_PROGRAM_ID,
  SystemProgramService
} from "@coin98/solana-support-library";



describe("callee", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Callee as Program<Callee>;
  console.log('program',program.programId.toString());
  
  it("Is initialized!", async () => {
    // Add your test here.
    const mainAccount = await SolanaConfigService.getDefaultAccount();
    const authAccount = await anchor.web3.Keypair.generate();
        const connection = new anchor.web3.Connection(
          "https://api.devnet.solana.com",
          "confirmed"
        );
        try { 
          
          const tx = await program.methods.init()
          .accounts({
            data: mainAccount.publicKey,
            payer: mainAccount.publicKey,
            authority: mainAccount.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
          })
          .rpc();
          console.log("Your transaction signature", tx);
        }
        catch(error) { 
          console.log('Error occur here',error);
        }
  });
});




// describe("caller", async () => {
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Caller as Program<Caller>;
//   anchor.setProvider(anchor.AnchorProvider.env());
//   // const program = anchor.workspace.Callee as Program<Callee>;
//   console.log('program',program.programId.toString());

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.doCpi(new BN(1000000))
//     .accounts({
//       dataAcc: 
//     })
//     .rpc();
//     console.log("Your transaction signature", tx);
//   });
// });



















// describe("token_programs", async () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());
//   const program = (await anchor.workspace
//     .TokenPrograms) as Program<TokenPrograms>;

//   it("Is initialized!", async () => {
//     const fromWallet = await SolanaConfigService.getDefaultAccount();
//     const mint = await anchor.web3.Keypair.generate();
//     const connection = new anchor.web3.Connection(
//       "http://localhost:8899",
//       "confirmed"
//     );

//     await TokenProgramService.createTokenMint(
//       connection,
//       fromWallet,
//       mint,
//       9,
//       fromWallet.publicKey,
//       fromWallet.publicKey
//     );

//     const airdropSignature = await connection.requestAirdrop(
//       fromWallet.publicKey,
//       anchor.web3.LAMPORTS_PER_SOL
//     );
//     const balance = await connection.getBalance(fromWallet.publicKey);
//     console.log("balance", balance);

//     console.log("asdasdasda", airdropSignature);
//     let associatedTokenAccount =
//       await TokenProgramService.createAssociatedTokenAccount(
//         connection,
//         fromWallet,
//         fromWallet.publicKey,
//         mint.publicKey
//       );

//     // let associatedTokenAccount = TokenProgramService.findAssociatedTokenAddress(
//     //   fromWallet.publicKey,
//     //   mint.publicKey
//     // );

//     console.log("abcd", associatedTokenAccount);

//     const tx = await program.methods
//       .mintToken(new BN(10))
//       .accounts({
//         mint: mint.publicKey,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         tokenAccount: associatedTokenAccount,
//         authority: fromWallet.publicKey,
//       })
//       .signers([fromWallet])
//       .rpc();
//     console.log("Your transaction signature", tx);
//   });
//   // Add your test here.
// });
