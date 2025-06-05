const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScrubieBurner", function () {
  it("burns tokens by sending to the dead address", async function () {
    const [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockToken");
    const token = await Token.deploy("Scrub", "SCR");
    await token.waitForDeployment();

    const Burner = await ethers.getContractFactory("ScrubieBurner");
    const burner = await Burner.deploy(token.target);
    await burner.waitForDeployment();

    await token.mint(user.address, 100);
    await token.connect(user).approve(burner.target, 50);

    await expect(burner.connect(user).burn(50))
      .to.emit(burner, "Burn")
      .withArgs(user.address, 50);

    expect(await token.balanceOf(user.address)).to.equal(50);
  });
});
