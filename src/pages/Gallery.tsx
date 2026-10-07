import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {callAPI} from "../api/api";
import type {NasaItem} from "../types/nasa";
import GalleryCard from "../components/GalleryCard";
import "./Gallery.css";

function Gallery() {
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(!sessionStorage.getItem("nasa-space"));
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSpaceCenter, setSelectedSpaceCenter] = useState("");

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

  const allYears = Array.from(
    new Set(items.map((item) => item.data[0].date_created.slice(0, 4)))
  ).sort((a, b) => Number(b) - Number(a));

  const allSpaceCenters = Array.from(
    new Set(items.map((item) => item.data[0].center).filter((center): center is string => Boolean(center)))
  )

  const filteredItems = items.filter((item) => {

    const matchesYear =
      selectedYear === "all" ||
      item.data[0].date_created.slice(0, 4) === selectedYear;

    const matchesSpaceCenter =
      selectedSpaceCenter === "" ||
      item.data[0].center === selectedSpaceCenter;

    return matchesYear && matchesSpaceCenter;
  });

  if (loading == true) {
    return <h1>Loading NASA gallery...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <h1>NASA Gallery</h1>

      <nav className="view-navigation">
        <Link to="/">List View</Link>
        <Link to="/gallery">Gallery View</Link>
      </nav>

      <p>Browse NASA images by year.</p>

      <div className = "year-filter">
        <label>
          Filter by year:{" "}
          <select
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
          >
            <option value="all">All years</option>

            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className = "space-center-filters">
        <p className = "filter-title">Filter By Space Center:</p>
      </div>

      <div className = "space-center-filters">
    
        <button
        // originally had the same dropdown as the years, but it did not look good.
          className={selectedSpaceCenter === "" ? "active" : ""}
          onClick={() => setSelectedSpaceCenter("")}
        >
          All Space Centers
        </button>

        {allSpaceCenters.map((center) => (
          <button
            key={center}
            className={selectedSpaceCenter === center ? "active" : ""}
            onClick={() => setSelectedSpaceCenter(center)}
          >
            {center}
          </button>
        ))}
      </div>

      <p>
        Showing {filteredItems.length} of {items.length} images
      </p>

      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <GalleryCard
            key={item.data[0].nasa_id}
            item={item}
          />
        ))}
      </div>
    </main>
  );
}

export default Gallery;