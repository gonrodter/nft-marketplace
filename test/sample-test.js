const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const CripyFaces = await ethers.getContractFactory("CripyFaces");
    const cripyFaces = await CripyFaces.deploy();
    await cripyFaces.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "cid/test.png"

    let balance = await cripyFaces.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await cripyFaces.payToMint(recipient, metadataURI, {value: ethers.utils.parseEther("0.05")});

    //wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await cripyFaces.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await cripyFaces.isContentOwned(metadataURI)).to.equal(true);
  });
});
