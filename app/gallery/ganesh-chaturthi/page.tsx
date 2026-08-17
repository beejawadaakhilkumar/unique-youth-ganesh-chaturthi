export default function GaneshChaturthiVideo() {
 const videos = [
    {
      id: 1,
      title: "Ganesh Chaturthi 2024 - Youth Celebration",
      src: "/Videos/Gang.mp4",
    },
    {
      id: 2,
      title: "Ganesh Chaturthi 2024 - Celebration Moments",
      src: "/Videos/Gang1.mp4",
    },
    {
      id: 3,
      title: "Ganesh Chaturthi 2024 - Youth Members",
      src: "/Videos/Gang2.mp4",
    },
    {
      id: 4,
      title: "Ganesh Chaturthi 2024 - Community Gathering",
      src: "/Videos/Gang3.mp4", 
    }
  ];
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.55)
          ),
          url("/images/vinayak.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "40px",
        }}
      >
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "14px",
            fontWeight: "700",
            color: "#ffd166",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Ganesh Chaturthi 2024
        </p>

        <h1
          style={{
            margin: "0 auto 15px",
            fontSize: "clamp(28px, 5vw, 42px)",
            lineHeight: "1.2",
            fontWeight: "700",
          }}
        >
          Youth Members Celebrating Ganesh Chaturthi
        </h1>

        <p
          style={{
            margin: "0 auto",
            maxWidth: "700px",
            fontSize: "16px",
            lineHeight: "1.7",
            color: "#eeeeee",
          }}
        >
          Relive the joyful moments of Ganesh Chaturthi 2024 as our youth
          members come together to celebrate with devotion, enthusiasm,
          and community spirit.
        </p>
      </div>

      {/* Video Grid */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              padding: "15px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(5px)",
            }}
          >
            {/* Video Number */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#eae6e2",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                {video.id}
              </span>

              <h2
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: "1.4",
                  color: "#222",
                }}
              >
                {video.title}
              </h2>
            </div>

            {/* Video */}
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "10px",
                background: "#000",
              }}
            >
              <video
                controls
                preload="metadata"
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  objectFit: "contain",
                  backgroundColor: "#000",
                }}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: 0,
          fontSize: "14px",
          color: "#eeeeee",
        }}
      >
        🕉️ Devotion • Unity • Celebration • Memories
      </p>
    </section>
  );
}