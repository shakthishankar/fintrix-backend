const { getContract } = require("../config/blockchain");

// POST /api/blockchain/store
// body: { id: "deal-123", data: "some verified search data" }
const storeOnChain = async (req, res) => {
  try {
    const { id, data } = req.body;

    if (!id || !data) {
      return res.status(400).json({
        success: false,
        message: "Both 'id' and 'data' are required",
      });
    }

    const contract = getContract();

    // Matches contract_abi.json → function store(string id, string data) returns (bool)
    const tx = await contract.store(id, data);
    const receipt = await tx.wait();

    return res.json({
      success: true,
      message: "Data stored on blockchain",
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
    });
  } catch (error) {
    console.error("Error in storeOnChain:", error);
    return res.status(500).json({
      success: false,
      message: "Blockchain store failed",
      error: error.message,
    });
  }
};

// GET /api/blockchain/fetch/:id
const fetchFromChain = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }

    const contract = getContract();

    // contract_abi.json → function fetch(string id) returns (string data, uint256 timestamp)
    const result = await contract.fetch(id);

    // Ethers v6 usually returns an array-like object
    const data = result.data ?? result[0];
    const timestamp = result.timestamp ?? result[1];

    return res.json({
      success: true,
      id,
      data,
      timestamp: timestamp ? Number(timestamp) : null,
    });
  } catch (error) {
    console.error("Error in fetchFromChain:", error);
    return res.status(500).json({
      success: false,
      message: "Blockchain fetch failed",
      error: error.message,
    });
  }
};

module.exports = {
  storeOnChain,
  fetchFromChain,
};
