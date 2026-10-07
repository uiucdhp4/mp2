import type { NasaItem } from "../types/nasa";
import { Link } from "react-router-dom";
import "./ListCard.css";

interface ListCardProps {
  item: NasaItem;
}

function ListCard({ item }: ListCardProps) {
  const data = item.data[0];
  const image = item.links?.[0]?.href;

  return (
    <Link
      // so that when we press home from details, it goes to right page
      to={`/asset/${data.nasa_id}?from=list`}
      className="list-card-link"
    >
      <article className="list-card">
        {image && (
          <img
            className="list-card-image"
            src={image}
            alt={data.title}
          />
        )}

        <div className="list-card-content">
          <h2>{data.title}</h2>
          <p>{data.date_created}</p>

          {data.description && (
            // soem get long, so just shorten
            <p>{data.description.slice(0, 200)}...</p>
          )}
        </div>
      </article>
    </Link>
  );
}

export default ListCard;