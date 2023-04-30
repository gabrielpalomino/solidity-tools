import axios from "axios";
import solc from "solc";

async function verifyContract(contractAddress, contractName, flattenedSourceCode, apiKey, apiUrl) {
  /**
   * More information about verifying contracts programmatically:
   * https://docs.polygonscan.com/tutorials/verifying-contracts-programmatically#4.-configuring-source-code-parameters
   */
  const params = new URLSearchParams({
    module: "contract",
    codeformat: "solidity-single-file",
    action: "verifysourcecode",
    contractaddress: contractAddress,
    sourceCode: flattenedSourceCode,
    contractname: contractName,
    compilerversion: "v" + solc.version(),
    evmversion: "",
    optimizationUsed: 1,
    runs: 200,
    licenseType: 3,
    apiKey: apiKey,
  });

  const response = await axios.post(apiUrl, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const result = response.data;

  if (result.status === "1") {
    console.log(
      `Verification successful status: ${result.status} message: ${result.message} GUID receipt: ${result.result}`
    );
  } else {
    console.log(
      `ERROR in verification status: ${result.status} message: ${result.message} GUID receipt: ${result.result}`
    );
  }
}

export { verifyContract };
