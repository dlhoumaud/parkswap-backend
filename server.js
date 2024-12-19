const express = require('express');
const app = express();
const dotenv = require('dotenv');
const smartContractRoutes = require('./routes/smartContracts');

dotenv.config();

app.use(express.json());
app.use('/api/contracts', smartContractRoutes);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
