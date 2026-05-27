


import './styles.css';


export default function SamaryaExperiences() {
  return (
    <section id="experiences" className="balance-wrapper">

      <div className="top-grid">

        <div className="balance-copy">

          <span className="eyebrow">
            HUSTLE & HARMONY
          </span>

          <h2>
            Born from <br />
            the Idea of <span>Balance</span>
          </h2>

          <p>
            Samarya is a boutique workation sanctuary in
            Chikkamagaluru, created for those who seek
            deep work, slow mornings and meaningful
            moments in nature.
          </p>

          <div className="amenities">

            <div>∞ Pool</div>
            <div>☕ Breakfast</div>
            <div>🔥 Bonfire</div>
            <div>🐾 Pet Friendly</div>

          </div>

        </div>

        <div className="hero-image">
          <img src={  "https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg"} />
        </div>

      </div>

      <div className="bottom-grid">

        <img
          className="pool-image"
          src={"https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg"}
        />

        <div className="desk-copy">

          <span className="eyebrow">
            BEYOND THE DESK
          </span>

          <h2>
            Beyond the Desk <br />
            at Samarya
          </h2>

          <p>
            Step away from screens and into
            experiences that ground you.
          </p>

          <button>
            Explore Experiences →
          </button>

        </div>

      </div>

      <div className="experience-grid">

        <div className="experience-card">
          <img src={"https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg"} />
          <h3>Coffee Trails</h3>
        </div>

        <div className="experience-card">
          <img src={"https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg"} />
          <h3>Bonfire Nights</h3>
        </div>

        <div className="experience-card">
          <img src={"https://samarya.online/wp-content/uploads/2026/02/IMG_9619-Edit.jpg"} />
          <h3>Offbeat Hikes</h3>
        </div>

      </div>

    </section>
  );
}
