const { ethers } = require("hardhat");

(async () => {
  // get accounts
  const accounts = await ethers.getSigners();

  // get the contract
  const factory = await ethers.getContractFactory("AssignmentERC20");

  // deploy the contract, change the name and symbol for your token
  const tokenName = "FLY";
  const tokenSymbol = "FLY";
  const fly = await factory.deploy(
    tokenName,
    tokenSymbol,
    accounts[0].address
  );

  console.log("token contract address:", fly.address);
})().catch((err) => console.error(err));
