const { ethers } = require("ethers");
const ABI = require("./abi.json");

let provider;
let wallet;
let contract;

function initBlockchain() {
  // Same idea as PROVIDER_URL from the sample project
  const rpcUrl = process.env.PROVIDER_URL; // e.g. Sepolia RPC
  const privateKey = process.env.PRIVATE_KEY; // testnet wallet
  const contractAddress = process.env.CONTRACT_ADDRESS; // deployed contract

  // Graceful fallback when placeholders or missing values are used
  if (
    !rpcUrl ||
    !privateKey ||
    !contractAddress ||
    rpcUrl.includes("placeholder") ||
    contractAddress === "0x0000000000000000000000000000000000000000"
  ) {
    console.warn(
      "⚠️ Blockchain not initialized (placeholder or missing env vars)"
    );
    return; // Do not crash the backend
  }

  provider = new ethers.JsonRpcProvider(rpcUrl);
  wallet = new ethers.Wallet(privateKey, provider);

  contract = new ethers.Contract(contractAddress, ABI, wallet);

  console.log("✅ Blockchain contract initialized");
}

function getContract() {
  if (!contract) {
    throw new Error("Blockchain not initialized. Call initBlockchain() first.");
  }
  return contract;
}

module.exports = {
  initBlockchain,
  getContract,
};
