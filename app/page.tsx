import Link from "next/link";
import GalleryCard from "@/components/GalleryCard";
import ExpandableYouth from "../components/Extentableyouth";
import ScheduleAlert from "@/components/ScheduleAlert"; // 1. Import the new component
import { createClient } from "@/lib/supabase";
import { demoGallery, GalleryItem } from "@/lib/data";

async function getData() {
  const supabase = createClient();

  if (!supabase) return { gallery: demoGallery };

  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return {
    gallery: (gallery as GalleryItem[]) || demoGallery,
  };
}

export default async function Home() {
  const { gallery } = await getData();

  return (
    <>
      <main>
        {/* --- HERO SECTION --- */}
        <section className="hero">
          <div className="hero-inner container">
            <div className="ganesh">🕉️</div>
            <div className="eyebrow">
              Ganesh Chaturthi • Community • Togetherness
            </div>
            <h1>
              Welcome to
              <br />
              Unique Youth
              <br />
              Association
            </h1>
            <p>
              Celebrating devotion, friendship and the spirit of our colony.
              This is our digital home for Ganesh Chaturthi memories and our
              community.
            </p>
            <Link href="/gallery" className="btn btn-gold">
              View Gallery →
            </Link>
          </div>
        </section>

        {/* --- LEADERSHIP SECTION --- */}
        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow accent-text">Our Leadership</div>
              <h2>Guiding Our Association</h2>
              <p>
                The pillars of our community who make this celebration possible.
              </p>
            </div>

            {/* 1. SINGLE CENTERED CORPORATOR */}
            <div className="corporator-wrapper">
              <div className="card leader-card corporator-card">
                <div className="leader-img">
                  <img
                    src="/images/Gemini_Generated_Image_aqixosaqixosaqix.png"
                    alt="Corporator"
                  />
                </div>
                <div className="leader-info">
                  <div className="leader-role">Hon. Corporator</div>
                  <h3>Madugula Chandra Reddy</h3>
                  <p>Peerzadiguda</p>
                </div>
              </div>
            </div>

            <div className="section-head">
              <h2>Youth Leaders</h2>
            </div>

            {/* 2. THREE YOUTH LEADERS */}
            <div className="leaders-grid">
              {/* Chetan */}
              <div className="card leader-card">
                <div className="leader-img">
                  <img src="/images/youth.png" alt="Chetan" />
                </div>
                <div className="leader-info">
                  <div className="leader-role">Youth Leader</div>
                  <h3>Chetan</h3>
                </div>
              </div>

              {/* Suraj */}
              <div className="card leader-card">
                <div className="leader-img">
                  <img src="/images/suraj.png" alt="Suraj" />
                </div>
                <div className="leader-info">
                  <div className="leader-role">Youth Leader</div>
                  <h3>Suraj</h3>
                </div>
              </div>
              {/* Sampath */}
              <div className="card leader-card">
                <div className="leader-img">
                  <img src="/images/sampath.png" alt="Sampath" />
                </div>
                <div className="leader-info">
                  <div className="leader-role">Youth Leader</div>
                  <h3>Sampath</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPANDABLE YOUTH MEMBERS COMPONENT --- */}
        <ExpandableYouth />

        {/* --- GALLERY SECTION --- */}
        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow accent-text">Memories</div>
              <h2>Ganesh Chaturthi Gallery</h2>
              <p>
                Moments from our celebrations, captured and shared with our
                community.
              </p>
            </div>
            <div className="gallery">
              {gallery.map((g) => (
                <GalleryCard key={g.id} item={g} />
              ))}
            </div>
            <div className="btn-wrapper">
              <Link href="/gallery" className="btn btn-primary">
                Open Full Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* --- 2. ADD THE SCHEDULE POPUP HERE --- */}
        <ScheduleAlert />

      </main>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="container footerin">
          <div>
            <strong>Unique Youth Association</strong>
            <br />
            <small>Ganesh Chaturthi • Together We Celebrate</small>
          </div>
          <small>Made for our colony ❤️</small>
        </div>
      </footer>
    </>
  );
}