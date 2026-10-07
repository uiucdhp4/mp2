import { Link } from "react-router-dom";
import type { NasaItem } from "../types/nasa";
import "./GalleryCard.css";

interface GalleryCardProps {
  item: NasaItem;
}

function GalleryCard({ item }: GalleryCardProps) {
  const data = item.data[0];
  const image = item.links?.[0]?.href;

  if (!image) {
    return null;
  }

  return (
    <Link
      to={`/asset/${data.nasa_id}?from=gallery`}
      className="gallery-card"
    >
      <img
        className="gallery-image"
        src={image}
        alt={data.title}
      />
      <h2>{data.title}</h2>
      <p>{data.date_created}</p>
    </Link>
  );
}

export default GalleryCard;