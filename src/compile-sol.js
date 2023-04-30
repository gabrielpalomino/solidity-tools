import solc from "solc";
import { readFileSync } from "fs";

if (process.argv.length < 3) {
  console.error("Usage: node compile.js <solidity_file>");
  process.exit(1);
}

const solidityFile = process.argv[2];
const contractName = solidityFile.split("/").pop().split(".")[0];
const file = readFileSync(solidityFile).toString();

/**
 * More information about creating input:
 * https://docs.soliditylang.org/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description
 */
const input = {
  language: "Solidity",
  sources: {
    [solidityFile]: {
      content: file,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log("Output: ", output);
console.log("Solidity File: ", solidityFile);
console.log("Contract Name: ", contractName);

const ABI = output.contracts[solidityFile][contractName].abi;
const bytecode = output.contracts[solidityFile][contractName].evm.bytecode.object;

console.log("Bytecode: " + bytecode);
console.log("ABI: " + JSON.stringify(ABI, null, 2));
console.log("Solc compiler version:", solc.version());

export { ABI, bytecode };
