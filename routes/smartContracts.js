const express = require('express');
const router = express.Router();
const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.INFURA_URL);
const contractABI = [ /* ABI du contrat */ ];
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Exemple : Appel d'une fonction du contrat
router.get('/getData', async (req, res) => {
  try {
    const data = await contract.methods.yourFunction().call();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Exemple : Transaction vers le contrat
router.post('/sendData', async (req, res) => {
  try {
    const { sender, value } = req.body;
    const tx = contract.methods.yourFunction(value);
    
    const gas = await tx.estimateGas({ from: sender });
    const txData = tx.encodeABI();

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data: txData,
        gas,
      },
      process.env.PRIVATE_KEY
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
