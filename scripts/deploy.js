// deploy.js
const { ethers } = require("hardhat");

(async () => {
  let account = await ethers.getSigner();
  let FLY = await ethers.getContractFactory("AssignmentERC20");
  let fly = await FLY.deploy("FLY", "FLY", account.address);
  console.log("FLY successfully deployed. FLY address=", fly.address);

  let Sales = await ethers.getContractFactory("Crowdsale");
  let sales = await Sales.deploy(fly.address, 100, {
    gasPrice: 10_000_000_000,
  });
  console.log(
    "Crowdsale succcessfully deployed. Crowdsale address=",
    sales.address
  );
})();
