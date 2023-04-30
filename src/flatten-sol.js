import fs from "fs";
import os from "os";
import path from "path";
import flattener from "truffle-flattener";

async function flattenContract(solidityFilePath) {
  try {
    // Create a temporary truffle-config.js file
    const tempConfigPath = path.join(os.tmpdir(), "truffle-config.js");
    fs.writeFileSync(tempConfigPath, "");

    // Set the working directory to the temporary folder
    const originalWorkingDirectory = process.cwd();
    process.chdir(os.tmpdir());

    // Flatten the contract
    const flattenedSourceCode = await flattener([solidityFilePath]);

    // Remove the temporary truffle-config.js file and restore the original working directory
    fs.unlinkSync(tempConfigPath);
    process.chdir(originalWorkingDirectory);

    // Remove comment // File: in the source code
    const cleanedFlattenedSourceCode = removeFilePathFromFlattenedSourceCode(flattenedSourceCode);
    return cleanedFlattenedSourceCode;
  } catch (error) {
    console.error("Error flattening the contract:", error);
  }
}

function removeFilePathFromFlattenedSourceCode(flattenedSourceCode) {
  const lines = flattenedSourceCode.split("\n");
  const filteredLines = lines.filter((line) => !line.startsWith("// File:"));
  return filteredLines.join("\n");
}

export { flattenContract };
