import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { fetchArtwork } from "../services/api";
import PaginationRounded from "../Components/paginationRounded";

function List({ searchQuery }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const artPerPage = 12; 
  const handlePageChange = (pageNumber) => {
    console.log("change in list", pageNumber);
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery]);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await fetchArtwork(
          searchQuery,
          currentPage,
          artPerPage
        );
        setData(response.data);
        setTotalPages(response.pagination.total_pages);
      } catch (error) {
        setError("Unable to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchQuery, currentPage, artPerPage]); 

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      {data.length > 0 ? (
        <>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {data.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={item.title || "Image"}
                height="140"
                image={
                  item.image_id
                    ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
                    : require("../image/notfound.png")
                }
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {item.title || "Title unavailable"}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {item.artist_title || "Artist unavailable"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${item.description.slice(0, 150)}${
                          item.description.length > 150 ? "..." : ""
                        }`,
                      }}
                    />
                  ) : (
                    "Description unavailable"
                  )}
                </Typography>
              </CardContent>
            </Card>
          ))}
          
        </div>
        <div className="row pt-4" style={{ paddingTop: "50px" }}>
            <PaginationRounded
              artPerPage={artPerPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <Typography variant="h6" align="center">
          No results found
        </Typography>
      )}
    </div>
  );
}
export default List;
