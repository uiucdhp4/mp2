// Main page for when an image is pressed
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {callAPI} from "../api/api";
import type {NasaItem} from "../types/nasa";
import "./Details.css"; 

function Detail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  useEffect(() => {
    async function loadNasa() {
      try {
        const data = await callAPI("space");
        setItems(data.collection.items);
      } catch (err) {
        console.error(err);
        setError("Failed to load NASA data.");
      } finally {
        setLoading(false);
      }
    }

    loadNasa();
  }, []);

  const item = items.find(
    (item) => item.data[0].nasa_id === id
  );

  const currentIndex = items.findIndex(
    (item) => item.data[0].nasa_id === id
  );

  if (loading == true) {
    return <h1>Loading NASA data...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!item) {
    return <h1>NASA item not found.</h1>;
  }

  const data = item.data[0];
  const image = item.links?.[0]?.href;

  return (
    <main className="detailPage">
      <div className = "homeLink">
        <Link to={from === "gallery" ? "/gallery" : "/"}>
          Back to Home
        </Link>
      </div>
      

      <div className="detailCard">
        <div className="detailInfo">
          <h1>{data.title}</h1>

          <p className="detailDate">
            {data.date_created}
          </p>

          {data.description && (
            <p className="detailDescription">
              {data.description}
            </p>
          )}

          <div className="detailMetadata">
            <p>NASA ID: {data.nasa_id}</p>
            <p>Media type: {data.media_type}</p>
          </div>
        </div>

        {image && (
          <img
            className="nasaDetailImage"
            src={image}
            alt={data.title}
          />
        )}

      </div>

      <div className="detailNavigation">
        <button
          onClick={() => {
            const previousItem = items[currentIndex - 1];

            if (previousItem) {
              navigate(`/asset/${previousItem.data[0].nasa_id}`);
            }
          }}
          disabled={currentIndex <= 0}
        >
          Previous
        </button>


        <button
          onClick={() => {
            const nextItem = items[currentIndex + 1];

            if (nextItem) {
              navigate(`/asset/${nextItem.data[0].nasa_id}`);
            }
          }}
          disabled={currentIndex === items.length - 1}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default Detail;