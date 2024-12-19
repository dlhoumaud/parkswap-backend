import Web3 from 'web3';

// Fonction pour créer un provider HTTP
export function createProvider(url) {
  return new Web3(url); // Web3 fonctionne directement avec l'URL
}