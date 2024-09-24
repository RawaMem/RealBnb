import "./AboutUs.css";

export function ProfileCard({
  image,
  name,
  location,
  headline,
  github,
  linkedin,
  portfolio,
  resume,
}) {
  return (
    <div className="profile-card">
      <header className="profile-card__header">
        <div className="profile-card__img-container">
          <img src={image} alt={`A picture of ${name}`} className="profile-card__img" />
        </div>
        <h1 className="profile-card__name">{name}</h1>
        <blockquote className="profile-card__location">{location}</blockquote>
        <p className="profile-card__headline">{headline}</p>
      </header>
      <nav className="profile-card__nav">
        <a href={github} target="_blank" className="profile-card__link">
          GitHub
        </a>
        <a href={linkedin} target="_blank" className="profile-card__link">
          LinkedIn
        </a>
        <a href={portfolio} target="_blank" className="profile-card__link">
          Portfolio
        </a>
        <a href={resume} target="_blank" className="profile-card__link">
          Resume
        </a>
      </nav>
    </div>
  );
}
