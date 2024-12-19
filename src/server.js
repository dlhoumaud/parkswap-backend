const express = require('express');
const app = express();
const dotenv = require('dotenv');
const smartContractRoutes = require('./routes/smartContracts'); // Import de tes routes

dotenv.config(); // Chargement des variables d'environnement

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes des smart contracts
app.use('/api/contracts', smartContractRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
const startServer = async () => {
  try {
    console.log("Initialisation du serveur...");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur :", error);
    process.exit(1); // Arrêter l'application proprement en cas d'erreur
  }
};

startServer();
