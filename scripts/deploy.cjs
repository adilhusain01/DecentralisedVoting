const hre = require('hardhat');

async function main() {
  try {
    // Get the contract factory
    const VotingSystem = await hre.ethers.getContractFactory('VotingSystem');

    // Deploy the contract
    console.log('Deploying VotingSystem contract...');
    const votingSystem = await VotingSystem.deploy();

    // Wait for deployment to finish
    // await votingSystem.waitForDeployment();
    const contractAddress = await votingSystem.address;

    console.log('VotingSystem contract deployed to:', contractAddress);
    console.log('Save this address for interaction script!');
  } catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
