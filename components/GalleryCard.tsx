import Link from "next/link";
import { GalleryItem } from "@/lib/data";

export default function GalleryCard({ item }: { item: GalleryItem }) {
  // If the item has an href (like we added in data.ts), use it. 
  // Otherwise, fallback to the main /gallery page.
  const targetLink = item.href || "/gallery";

  return (
    <Link href={targetLink} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div className="gallery-card" style={{ cursor: "pointer" }}>
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} />
        ) : (
          <div>
            <div className="gallery-placeholder-icon">🪔</div>
            <strong>{item.title}</strong>
          </div>
        )}
      </div>
    </Link>
  );
}