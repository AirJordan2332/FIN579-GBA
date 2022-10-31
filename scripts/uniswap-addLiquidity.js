const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

// uniswap v2 factory contract address
// https://docs.uniswap.org/protocol/V2/reference/smart-contracts/factory
const uniswapFactoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

// uniswap v2 router contract address
// https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02
const uniswapRouterAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

// FLY token contract address
const flyAddr = "0xceE732A0278df525F474a121902F8f4e7F372c52";

// CHRON token contract address
const chronAddr = "0xDd6010412b61570bd6f0101460bb80bDbE103E28";

const getAbi = (filename) => {
  try {
    const dir = path.resolve(__dirname, filename);

    const file = fs.readFileSync(dir, "utf8");

    const json = JSON.parse(file);

    return json;
  } catch (err) {
    console.error(err);
  }
};

const tokenApprove = async (token, uniswap, amount) => {
  const symbol = await token.symbol();
  let response = await token.approve(uniswap.address, amount);
  let receipt = await response.wait();
  let approval = receipt.events.find((x) => x.event == "Approval");
  console.log(`${symbol} approve`, approval.args.value);
};

(async () => {
  // get account
  const account = await ethers.getSigner();

  // get FLY token contract
  const fly = await ethers.getContractAt("AssignmentERC20", flyAddr);

  // get CHRON token contract
  const chron = await ethers.getContractAt(
    getAbi("Chronium-abi.json"),
    chronAddr
  );

  // get Uniswap V2 ffacotry contract
  const uniswapFactory = await ethers.getContractAt(
    getAbi("uniswapfactory-abi.json"),
    uniswapFactoryAddr
  );

  // get Uniswap V2 router contract
  const uniswap = await ethers.getContractAt(
    getAbi("uniswaprouter-abi.json"),
    uniswapRouterAddr
  );

  let flyLiquidity = 8000;
  let chronLiquidity = 8000;

  await tokenApprove(fly, uniswap, flyLiquidity);

  await tokenApprove(chron, uniswap, chronLiquidity);

  // create the liquidity pool containing FLY and CHRON
  const ts = (await ethers.provider.getBlock()).timestamp + 100;

  await uniswap.addLiquidity(
    fly.address,
    chron.address,
    flyLiquidity,
    chronLiquidity,
    0,
    0,
    account.address,
    ts,
    // { gasPrice: 20_000_000_000 }
  );
})().catch((err) => console.error(err));
