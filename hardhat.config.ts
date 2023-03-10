import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import 'dotenv/config';
import 'solidity-coverage';
import 'hardhat-deploy';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/config';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  'https://eth-mainnet.alchemyapi.io/v2/your-api-key';
const GOERELI_RPC_URL =
  process.env.GOERELI_RPC_UR ||
  'https://eth-kovan.alchemyapi.io/v2/your-api-key';
const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL ||
  'https://polygon-mainnet.alchemyapi.io/v2/your-api-key';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'your-api-key';
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || 'your-api-key';
const REPORT_GAS = Boolean(process.env.REPORT_GAS) || false;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: MAINNET_RPC_URL
      },
      chainId: 31337
    },
    localhost: {
      chainId: 31337
    },
    goerli: {
      url: GOERELI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 1
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 137
    }
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY
    }
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0 // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    pledger1: {
      default: 1
    },
    pledger2: {
      default: 2
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.8'
      }
    ]
  },
  mocha: {
    timeout: 200000 // 200 seconds max for running tests (may need to bump up for slow testnet during staging)
  }
};

export default config;
