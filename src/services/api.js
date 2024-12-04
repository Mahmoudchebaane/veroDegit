import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api", 
    timeout: 5000, 
  });

export const fetchArtwork = async (searchQuery ="", currentpage, artlimit) => {
  try {
      const options = searchQuery
  ? { params: { search: searchQuery, page: currentpage, limit:artlimit } }
  : { params :{page: currentpage, limit:artlimit}};
    const response = await API.get("/artworks", options);
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    if (error.response) {
      console.error("Code d'erreur :", error.response.status);
      console.error("Message de l'API :", error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse reçue. Vérifiez le serveur API.");
    } else {
      console.error("Erreur de configuration :", error.message);
    }
    throw error; 
  }
};
