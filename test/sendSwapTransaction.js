const { expect, assert } = require("chai");
const { ethers } = require("ethers");

const {
  uniswapFactory,
  uniswapRouter,
  addressFrom,
  addressTo,
} = require("../utils/addressList.js");

const {
  erc20Abi,
  factoryAbi,
  pairAbi,
  routerAbi,
} = require("../utils/abiList.js");

describe("Read and Write to the Blockchain", () => {
  let provider,
    contractFactory,
    routerContract,
    tokenContractFrom,
    tokenContractTo;
  provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/ImAESv4irDL1pqZ90V9E82Ijj_l7Z8bP"
  );

  contractFactory = new ethers.Contract(uniswapFactory, factoryAbi, provider);
  routerContract = new ethers.Contract(uniswapRouter, routerAbi, provider);
  tokenContractFrom = new ethers.Contract(addressFrom, erc20Abi, provider);
  tokenContractTo = new ethers.Contract(addressTo, erc20Abi, provider);

  console.log(contractFactory);
});
