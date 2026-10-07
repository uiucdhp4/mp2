import {useEffect, useState} from "react";
import {callAPI} from "../api/api";
import type {NasaItem} from "../types/nasa";
import ListCard from "../components/ListCard";
import {Link} from "react-router-dom";
import "./Home.css";

function Home() {
  // default will be a blank array of items
  const [items, setItems] = useState<NasaItem[]>([]);

  // default search is empty (nothing typed)
  const [search, setSearch] = useState("");

  // defauly sorting is by the title
  const [sortBy, setSortBy] = useState("title");

  // default sorting will eb in ascending order
  const [sortOrder, setSortOrder] = useState("asc");

  // are we loading and waiting for the api to return or not?
  const [loading, setLoading] = useState(!sessionStorage.getItem("nasa-space"));
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNasa() {
      try {
        // initital query (so all possible results have "space" in them. might change later depending on results)
        const data = await callAPI("space");
        setItems(data.collection.items);
      } catch (err) {
        console.error(err);
        setError("Failed to load NASA data.");
      } finally {
        // regardless of the result we are done so we are not longer loading anymore
        setLoading(false);
      }
    }

    // load all items and store them in the "items" array
    loadNasa();
  }, []);

  const filteredItems = items.filter((item) => {
    const data = item.data[0];
    // add to trim since a " " before the title would cause " Roman Telescope" to come ebfore "Artimis"
    return data.title.trim().toLowerCase().includes(search.toLowerCase());
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const first = a.data[0];
    const second = b.data[0];

    let comparison = 0;

    if (sortBy === "title") {
      comparison = first.title.trim().localeCompare(second.title);
    } else if (sortBy === "date") {
      comparison =
        new Date(first.date_created).getTime() -
        new Date(second.date_created).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (loading == true) {
    return <h1>Loading NASA data...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  console.log(
  sortedItems.slice(0, 10).map((item) => item.data[0].title)
);

  return (
    <main>
      <h1>NASA Explorer</h1>

      <nav className="view-navigation">
        <Link to="/">List View</Link>
        <Link to="/gallery">Gallery View</Link>
      </nav>

      <p>Explore NASA's image library.</p>
 
      <input className = "search-bar" type="text" placeholder="Search anything! (please don't type 'space' as the search is already filtered by it, so it wont change anything" value={search} onChange={(event) => setSearch(event.target.value)}/>

      <div className = "sort-controls">
        <label>
          Sort by:{" "}
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="title">Title</option>
            <option value="date">Date</option>
          </select>
        </label>

        <label>
          Order:{" "}
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <p>
        Showing {sortedItems.length} of {items.length} results
      </p>

      <div className = "list-container">
        {sortedItems.map((item) => (
          // create a card for each image
          <ListCard
            key={item.data[0].nasa_id}
            item={item}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;