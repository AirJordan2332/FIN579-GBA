const { ethers } = require("hardhat");

(async () => {
  // get accounts
  const accounts = await ethers.getSigners();

  // token contract address
  const contractAddr = "0xceE732A0278df525F474a121902F8f4e7F372c52";
  // get the contract
  const factory = await ethers.getContractFactory("Crowdsale");

  const crowdSale = await factory.deploy(
    contractAddr,
    100,
    accounts[0].address
  );

  console.log("CrowdSale contract address:", crowdSale.address);

})().catch((err) => console.error(err));
