// https://eth-goerli.g.alchemy.com/v2/OgKN_xcoFWS_Nbjhh5SlNS032pDx1Z-H
// require('@nomiclabs/hardhat-waffle');
require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/OgKN_xcoFWS_Nbjhh5SlNS032pDx1Z-H',
      accounts: ['8b351828ccdaae67dc7a9293c4218f85191fef6ed0d0c3cdd9024d487813411b']
    }
  }
};

