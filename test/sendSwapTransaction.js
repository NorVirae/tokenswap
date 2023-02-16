const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {waffle} = require("@nomiclabs/hardhat-waffle")
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
    tokenContractTo,
    decimals,
    amountIn,
    amountOut;

  // connect to provider
  provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/ImAESv4irDL1pqZ90V9E82Ijj_l7Z8bP"
  );

  // COntract addresses
  contractFactory = new ethers.Contract(uniswapFactory, factoryAbi, provider);
  routerContract = new ethers.Contract(uniswapRouter, routerAbi, provider);
  tokenContractFrom = new ethers.Contract(addressFrom, erc20Abi, provider);
  tokenContractTo = new ethers.Contract(addressTo, erc20Abi, provider);

  async function getAmountsOut(amountIn) {
    amountIn = ethers.utils.parseUnits(amountIn);
    let amountsOut = await routerContract.getAmountsOut(amountIn, [
      tokenContractFrom.address,
      tokenContractTo.address,
    ]);
    return amountsOut[1].toString();
  }

  it("should connect router, factory, from, to the blockchain", () => {
    assert(provider._isProvider);
    expect(contractFactory.address).to.equal(
      "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    );
    expect(routerContract.address).to.equal(
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    );
    expect(tokenContractFrom.address).to.equal(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    );
    expect(tokenContractTo.address).to.equal(
      "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"
    );
  });

  it("should return amounts out price", async () => {
    let amountInHuman = "1";
    amountOut = await getAmountsOut(amountInHuman);
    console.log(ethers.utils.formatUnits(amountOut));
    assert(amountOut);
  });

  it("should perform a swap", async () => {
    let amountInHuman = "1";
    amountIn = ethers.utils.parseUnits(amountInHuman, 18);
    amountOut = await getAmountsOut(amountInHuman);
    const [ownerSigner] = await ethers.getSigners();
    const uniswapV2Router = new ethers.Contract(
      routerContract.address,
      routerAbi,
      ownerSigner
    );
    const myAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const swapTxn = await uniswapV2Router.swapExactTokensForTokens(
      amountIn,
      amountOut,
      [tokenContractFrom.address, tokenContractTo.address],
      myAddr,
      Date.now() + 200 * 1000,
      {
        gasLimit:200000,
        gasPrice: ethers.utils.parseUnits("5.5", "gwei")
      }
    );
    // const mainnetForkProvider = waffle.provider
    // assert(swapTxn.hash)
    // const txreceipt = await mainnetForkProvider.getTransactionReceipt(
    //     swapTxn.hash
    // )
    
  });
});
