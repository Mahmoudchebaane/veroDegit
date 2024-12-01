import axios from "axios";

// Création de l'instance Axios
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Base URL de l'API
  timeout: 5000, // Timeout pour la requête (5 secondes)
});

// Fonction pour récupérer les artworks
export const fetchArtwork = async () => {
  try {
    const response = await API.get("/artworks");
    console.log("Réponse de l'API :", response); // Affiche les détails de la réponse
    return response.data; // Retourne uniquement les données
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);

    // Ajout d'un traitement plus précis des erreurs
    if (error.response) {
      // L'API a répondu avec un code d'erreur (ex. 404, 500)
      console.error("Code d'erreur :", error.response.status);
      console.error("Message de l'API :", error.response.data);
    } else if (error.request) {
      // La requête a été envoyée mais aucune réponse n'a été reçue
      console.error("Aucune réponse reçue. Vérifiez le serveur API.");
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error("Erreur de configuration :", error.message);
    }

    throw error; // Propagation de l'erreur pour gestion côté appelant
  }
};
