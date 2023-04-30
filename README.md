# Solidity Web3 Tools

A collection of Node.js scripts and shell scripts to make it easy to compile, deploy, and verify Solidity smart contracts using Web3.

## Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)
4. [License](#license)

## Installation

1. Clone the repository:
```git clone https://github.com/your_username/solidity-web3-tools.git```

2. Change to the project directory:
```cd solidity-web3-tools```

3. Install the required packages:
```npm install```


## Configuration

Create a `.env` file in the root directory of the project and set up the following environment variables:

`NETWORK_URL=<your_provider_url>`
Replace `<your_provider_url>` with the URL of your Ethereum provider (e.g., Infura)

`PRIVATE_KEY=<your_private_key>`
Replace `<your_private_key>` with the private key of your ethereum account.

`POLIGONSCAN_API_URL=<your_prefered_poligonscan>`
Replace `<your_prefered_poligonscan>` with https://api-testnet.polygonscan.com/api if you are deploying to Testnet network or https://api.polygonscan.com/api to deploy on production.

`POLIGONSCAN_KEY=<your_api_key>`
Replace `<your_api_key>` with your API KEY.

## Usage

### Compiling a Solidity smart contract

Run the following command in your terminal:
`./shell/compile-sol.sh <solidity_file>`

Replace `<solidity_file>` with the name of the Solidity file you want to compile.

### Deploying a Solidity smart contract

Run the following command in your terminal:
`./shell/deploy-sol.sh <solidity_file> [-v]`


Replace `<solidity_file>` with the name of the Solidity file you want to deploy. Optionally, add `-v` if you want to verify the contract as well.

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details.


