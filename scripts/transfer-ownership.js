// transfer-ownership.js
const { ethers } = require("hardhat");

(async () => {
  // get accounts
  const accounts = await ethers.getSigners();

  // token contract address
  const tokenContractAddr = "0xceE732A0278df525F474a121902F8f4e7F372c52";
  const CrowdsaleContractAddr = "0xFd28bd929cB3C389927d0Fe8AD7880fFC6a08135";

  // get the contract
  const factory = await ethers.getContractFactory("AssignmentERC20");

  const fly = await factory.attach(tokenContractAddr);

  const balance = await fly.balanceOf(accounts[0].address);

  fly.transferOwnership(CrowdsaleContractAddr);

  console.log("token contract ownership transferred");

})().catch((err) => console.error(err));
