const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Token = await ethers.getContractFactory("MockToken");
  const token = await Token.deploy("Scrub", "SCR");
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const Burner = await ethers.getContractFactory("ScrubieBurner");
  const burner = await Burner.deploy(token.address);
  await burner.deployed();
  console.log("Burner deployed to:", burner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
