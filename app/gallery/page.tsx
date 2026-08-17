import GalleryCard from "@/components/GalleryCard";
import { createClient } from "@/lib/supabase";
import { demoGallery, GalleryItem } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Gallery() {
  const supabase = createClient();
  let gallery: GalleryItem[] = demoGallery;

  if (supabase) {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
      
    if (data) gallery = data as GalleryItem[];
  }

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow accent-text">Festival Memories</div>
          <h2>Gallery</h2>
          <p>Our Ganesh Chaturthi moments.</p>
        </div>
        <div className="gallery">
          {gallery.map((g) => (
            <GalleryCard key={g.id} item={g} />
          ))}
        </div>
      </div>
    </main>
  );
}