import { Callee } from './../target/types/callee';
import { Caller } from './../target/types/caller';
import { BN } from "bn.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from 'chai';

// import { ProgramDerivedAddress } from "../target/types/program_derived_address";
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

  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const mainAccount = await SolanaConfigService.getDefaultAccount();
  //   console.log('mainAccount',mainAccount);
  //   const seedsArr = [4, 151, 229, 53, 244, 77, 229, 11];
  //   const seeds = Buffer.from(seedsArr)
  //   console.log('seeds',seeds);
  const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  //     try { 
  //       const programAccount = await connection.getAccountInfo(mainAccount.publicKey);
  //       console.log('programAccount',programAccount.owner);
  //       const [derivedWalletAddress, derivedWalletNonce] = await anchor.web3.PublicKey.findProgramAddress([seeds], program.programId)
  //       console.log('here',derivedWalletAddress, derivedWalletNonce)
  //       const tx = await program.methods.init(
  //         seeds
  //         )
  //         .accounts({
  //           payer: mainAccount.publicKey,
  //           adminAccount: derivedWalletAddress,
  //           systemProgram: anchor.web3.SystemProgram.programId
  //         })
  //         .signers([mainAccount])
  //         .rpc();
  //         console.log("Your transaction signature", tx);

  //       // const tx = await callerProgram.methods.doCpiWithPdaAuthority(
  //       //   new BN(1000)
  //       // ) 
  //       // .accounts({ 
  //       //   dataAcc : derivedWalletAddress,
  //       //   calleeAuthority: derivedWalletAddress,
  //       //   callee: program.programId
  //       // })
  //       // .signers([mainAccount])
  //       // .rpc();
  //       // console.log('Doing with PDA AUTHOR')
  //       //     console.log("Your transaction signature", tx);


  //       }
  //       catch(error) { 
  //         console.log('Error occur here',error);
  //       }
  //     });


  //   it("Is initialized!", async () => {
  //     // Add your test here.
  //     const mainAccount = await SolanaConfigService.getDefaultAccount();
  //     console.log('mainAccount',mainAccount);
  //     const seedsArr = [4, 151, 229, 53, 244, 77, 229, 11];
  //     const seeds = Buffer.from(seedsArr)
  //     console.log('seeds',seeds);
  //     const connection = new anchor.web3.Connection(
  //       "https://api.devnet.solana.com",
  //       "confirmed"
  //       );
  //       try { 
  //         const programAccount = await connection.getAccountInfo(mainAccount.publicKey);
  //         console.log('programAccount',programAccount.owner);
  //         const [derivedWalletAddress, derivedWalletNonce] = await anchor.web3.PublicKey.findProgramAddress([seeds], program.programId)
  //         console.log('here',derivedWalletAddress, derivedWalletNonce)
  //         const tx = await program.methods.setData(
  //           new BN(1000)
  //           )
  //           .accounts({
  //             adminAccount: derivedWalletAddress,
  //             accountData: mainAccount.publicKey
  //           })
  //           // .signers([mainAccount])
  //           .rpc();
  //           console.log("Your transaction signature", tx);
  //         }
  //         catch(error) { 
  //           console.log('Error occur here',error);
  //         }
  //       });

  // });



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
        // console.log('done 1 !');
        console.log('tx_here',tx);
    }
    catch(error) { 
      console.log('error,',error)
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

        console.log('tx_here',tx)
    }
  
    //   // expect(
    //   //   (
    //   //     await program.account.dataCallee.fetch(calleeMasterPDA)
    //   //   ).data.toNumber()
    //   // ).to.equal(42)
    // }
    catch(error) { 
      console.log('error',error)
    }

  })

})

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
