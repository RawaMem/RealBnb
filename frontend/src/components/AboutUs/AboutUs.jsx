import { ProfileCard } from "./ProfileCard";

import "./AboutUs.css";
import "./AboutUsQueries.css";

export function AboutUs() {
  return (
    <div className="about-us">
      <h3 className="about-us__title">Team</h3>
      <h1 className="about-us__main_title">Meet our team</h1>
      <h3 className="about-us__description">From skilled designers to tech-savvy developers, each member brings a unique perspective and expertise to the table.</h3>

      <div className="profile-cards">
        <ProfileCard
          image="https://astrogram.s3.us-east-2.amazonaws.com/profile_picture.png"
          name="Jefferson Jurado Garcia"
          location="Houston, Texas"
          headline="Fullstack Software Engineer| 2+ Years of Experience | Startup Experience | Skilled in React, Node.js, Python, PSQL | Focused on Systems Design, DSA, and Frontend skills at Formation"
          github="https://github.com/JeffersonGarcia15"
          linkedin="https://www.linkedin.com/in/jefferson-jurado-garcia/"
          portfolio="https://jefferson-portfolio.onrender.com/"
          resume="https://docs.google.com/document/d/1KXYEIMUuh78O5Nug3vdZE2uzfefz_JbND3W0FPqTuUo/edit?usp=sharing"
        />
        <ProfileCard
          image="https://astrogram.s3.us-east-2.amazonaws.com/avatar.png"
          name="Sherry"
          location="Houston, Texas"
          headline="Fullstack Software Engineer| 2+ Years of Experience | Startup Experience | Skilled in React, Node.js, Python, PSQL | Focused on Systems Design, DSA, and Frontend skills at Formation"
          github="https://github.com/JeffersonGarcia15"
          linkedin="https://www.linkedin.com/in/jefferson-jurado-garcia/"
          portfolio="https://jefferson-portfolio.onrender.com/"
          resume="https://docs.google.com/document/d/1KXYEIMUuh78O5Nug3vdZE2uzfefz_JbND3W0FPqTuUo/edit?usp=sharing"
        />
        <ProfileCard
          image="https://astrogram.s3.us-east-2.amazonaws.com/avatar.png"
          name="Rawaha"
          location="Houston, Texas"
          headline="Fullstack Software Engineer| 2+ Years of Experience | Startup Experience | Skilled in React, Node.js, Python, PSQL | Focused on Systems Design, DSA, and Frontend skills at Formation"
          github="https://github.com/JeffersonGarcia15"
          linkedin="https://www.linkedin.com/in/jefferson-jurado-garcia/"
          portfolio="https://jefferson-portfolio.onrender.com/"
          resume="https://docs.google.com/document/d/1KXYEIMUuh78O5Nug3vdZE2uzfefz_JbND3W0FPqTuUo/edit?usp=sharing"
        />
      </div>
    </div>
  );
}
