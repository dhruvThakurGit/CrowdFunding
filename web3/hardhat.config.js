/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "sepolia",
    networks: {
      hardhat: {},
      sepolia: {
        url: "https://rpc.ankr.com/eth_sepolia",
        accounts: [
          `0x7bd59667a9f27d4cc7d3738a422fb4d086a1c97f46fa8e0d824f8ac9d8e19798`,
        ],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
