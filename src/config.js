import dotenv from "dotenv";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

dotenv.config();
const provider = new HDWalletProvider(process.env.PRIVATE_KEY, process.env.NETWORK_URL);
const web3 = new Web3(provider);

export { web3 };
