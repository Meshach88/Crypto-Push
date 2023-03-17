


const main = async () => {
  const FundTransfer = await hre.ethers.getContractFactory('FundTransfer');
  const fundtransfer = await FundTransfer.deploy();
  
  await fundtransfer.deployed();

  console.log('The deployed address of FundTransfer: ', fundtransfer.address);

}
 
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
