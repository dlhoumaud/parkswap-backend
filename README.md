# parkswap-backend

## Instructions

### Installer les dépendances :

```bash
npm install
```
Configurer l'environnement : Remplissez les valeurs dans le fichier **.env.**

Déployer le contrat : Utilisez un outil comme Truffle ou Hardhat pour déployer votre contrat sur une blockchain locale ou testnet, puis récupérez l'adresse du contrat.

Lancer le serveur :

```bash
npm start
```
Tester les routes : Utilisez un client API comme Postman ou Curl pour tester les interactions avec le contrat.


## Configuration

#### 1. **Vérifiez votre fichier `.env`**
Dans le fichier `.env`, remplacez la valeur de `CONTRACT_ADDRESS` par l'adresse réelle de votre contrat déployé. Par exemple :

```plaintext
CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678
```

- L'adresse doit être une chaîne hexadécimale valide de 42 caractères, commençant par `0x`.

#### 2. **Déployez le contrat (si nécessaire)**
Si vous n'avez pas encore déployé le contrat, vous pouvez utiliser **Truffle** ou **Hardhat** pour le déployer localement ou sur un testnet. Voici un exemple avec Truffle :

- Compilez et déployez :
  ```bash
  truffle compile
  truffle migrate --network development
  ```
- Une fois déployé, récupérez l'adresse du contrat (affichée dans les journaux de déploiement) et mettez-la dans `.env`.

#### 3. **Vérifiez la casse de l'adresse**
Les adresses Ethereum sont sensibles à la casse lorsqu'elles incluent une somme de contrôle (checksum). Vous pouvez valider votre adresse sur un outil comme [Etherscan Checksum Validator](https://etherscan.io/verifyAddress).

#### 4. **Redémarrez le serveur**
Une fois l'adresse corrigée dans le fichier `.env`, redémarrez le serveur :

```bash
npm start
```

---

### Exemple `.env` corrigé :

```ini
INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=0xYourPrivateKey
CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678
```

---

### Débogage supplémentaire

- Si vous utilisez Ganache, l'adresse du contrat sera dans la sortie des logs de la migration.
- Vérifiez que le fichier `.env` est correctement chargé dans le code (`dotenv.config()`).
- Si l'erreur persiste, insérez un log dans le fichier `smartContracts.js` pour vérifier la valeur chargée :

```javascript
console.log("Contract Address:", process.env.CONTRACT_ADDRESS);
```

Cela permettra de confirmer que la bonne valeur est utilisée. Une fois corrigé, le serveur devrait fonctionner correctement.

## Tests

Pour tester votre backend avec **Postman**, voici les étapes et les détails des requêtes API que vous pouvez lancer :

---

### 1. **Obtenir des données depuis le contrat :**
#### Requête : `GET /api/contracts/getData`

- **URL :**  
  ```
  http://localhost:3000/api/contracts/getData
  ```

- **Méthode :** `GET`

- **Description :**  
  Appelle une fonction de lecture (sans transaction) dans le contrat intelligent pour récupérer des données. Par exemple, la fonction `getData()` dans le contrat.

- **Résultat attendu (JSON) :**
  ```json
  {
    "success": true,
    "data": "Value stored in the contract"
  }
  ```

---

### 2. **Envoyer des données au contrat :**
#### Requête : `POST /api/contracts/sendData`

- **URL :**  
  ```
  http://localhost:3000/api/contracts/sendData
  ```

- **Méthode :** `POST`

- **En-têtes :**
  - `Content-Type: application/json`

- **Body (raw, JSON) :**
  ```json
  {
    "sender": "0xYourEthereumAddress",
    "value": "YourValueToSend"
  }
  ```

  - Remplacez `"0xYourEthereumAddress"` par l'adresse Ethereum que vous utilisez pour effectuer la transaction.
  - Remplacez `"YourValueToSend"` par la valeur à transmettre à la fonction `setData`.

- **Description :**  
  Appelle une fonction d'écriture dans le contrat intelligent (comme `setData`) en signant la transaction.

- **Résultat attendu (JSON) :**
  ```json
  {
    "success": true,
    "receipt": {
      "transactionHash": "0x123abc...",
      "status": true,
      "blockNumber": 12345,
      "gasUsed": 21000
    }
  }
  ```

---

### 3. **Ajouter des routes supplémentaires (si besoin) :**

Si votre contrat inclut d'autres fonctions, vous pouvez ajouter des routes correspondantes dans `routes/smartContracts.js` et les tester de la même manière.

---

### Conseils pour Postman
1. **Tester les variables dynamiques :**
   Vous pouvez utiliser les fonctionnalités de Postman pour définir des variables (par exemple, une variable pour l'URL du serveur ou les adresses Ethereum).

2. **Observer les journaux du serveur :**
   Si quelque chose ne fonctionne pas comme prévu, vérifiez les erreurs ou les journaux affichés dans votre console Node.js.

3. **Simuler les tests en local :**
   Si vous utilisez une blockchain locale comme **Ganache**, vérifiez que l'adresse du contrat et les comptes utilisés sont correctement configurés.
