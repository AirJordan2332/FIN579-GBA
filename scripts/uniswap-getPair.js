const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

// uniswap v2 factory contract address
// https://docs.uniswap.org/protocol/V2/reference/smart-contracts/factory
const uniswapFactoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

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

(async () => {
  // get account
  const account = await ethers.getSigner();

  // get Uniswap V2 factory contract
  const uniswapFactory = await ethers.getContractAt(
    getAbi("uniswapfactory-abi.json"),
    uniswapFactoryAddr
  );

  let pairAddr = await uniswapFactory.getPair(flyAddr, chronAddr);

  console.log(pairAddr);
})().catch((err) => console.error(err));
