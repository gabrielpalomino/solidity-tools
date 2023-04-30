import { web3 } from "./config.js";
import { ABI, bytecode } from "./compile-sol.js";
import { verifyContract } from "./verify-sol.js";
import { flattenContract } from "./flatten-sol.js";
import dotenv from "dotenv";
dotenv.config();

// Get the account to use
const accounts = await web3.eth.getAccounts();
const deployAccount = accounts[0];

// Create contract
const contract = new web3.eth.Contract(ABI);

// Create transation
const deployTransaction = contract.deploy({
  data: bytecode,
});

// Calculate costs
const gasEstimate = await deployTransaction.estimateGas({
  from: deployAccount,
});
const gasPrice = await web3.eth.getGasPrice();

// Send
const tx = deployTransaction.send({
  from: deployAccount,
  gas: gasEstimate,
  gasPrice: gasPrice,
});

// Listen for the 'receipt' event
tx.once("receipt", async (receipt) => {
  // Log receipt
  console.log("Contract deployed at address:", receipt.contractAddress);

  // Verify contract if needed
  const verifyFlag = process.argv[3] === "true";
  if (verifyFlag) {
    // Read the Solidity
    const solidityFile = process.argv[2];
    const contractName = solidityFile.split("/").pop().split(".")[0];
    const flattenedSourceCode = await flattenContract(solidityFile);
    const apiKey = process.env.POLIGONSCAN_KEY;
    const apiUrl = process.env.POLIGONSCAN_API_URL;

    // Verify the contract after a short delay to be able to propagate the contract on the network
    console.log("...waiting to propagate on the network");
    setTimeout(async () => {
      console.log("...verifying contract");
      await verifyContract(
        receipt.contractAddress,
        contractName,
        flattenedSourceCode,
        apiKey,
        apiUrl
      );
      process.exit();
    }, 1000 * 60);
  } else {
    process.exit();
  }
});
