import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//import Data from "../mock/mockData.json";

import { fetchArtwork } from "../services/api";

function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchArtwork();
        setData(response);
      } catch (error) {
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  console.log("111111", data);
  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;
  /*
  useEffect(() => {
    setData(Data);
    console.log(data);
    setLoading(false);
  }, [data]);
  */
  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Typography variant="h6" align="center">
          Chargement des données...
        </Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {data.slice(0, 50).map((item) => (
            <Card key={item.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={item.title || "Image"}
                height="140"
                image={
                  item.image ||
                  `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
                }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title || "Titre indisponible"}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item.artist_title || "Artist indisponible"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.description
                        ? item.description.slice(0, 150) +
                          (item.description.length > 150 ? "..." : "")
                        : "Description indisponible",
                    }}
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Partager</Button>
                <Button size="small">En savoir plus</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
export default List;
