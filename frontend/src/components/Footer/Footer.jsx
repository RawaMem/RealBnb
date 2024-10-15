import { useState } from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import "./Footer.css";

function Footer() {
    const history = useHistory();
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showAboutTheProject, setShowAboutTheProject] = useState(false);
    const [technologies, setTechnologies] = useState(false);

    function toggleShowHowItWorks() {
        setShowHowItWorks((prev) => !prev);
    }

    function toggleShowAboutTheProject() {
        setShowAboutTheProject((prev) => !prev);
    }

    return (
        <footer className="footer">
            {showHowItWorks && (
                <Modal onClose={toggleShowHowItWorks}>
                    <div className="about__the__project show__it__works">
                        <h1>
                            Please visit the{" "}
                            <a
                                href="https://github.com/RawaMem/RealBnb"
                                target="_blank"
                                className="footer__how__it__works__a"
                                rel="noreferrer"
                            >
                                repo
                            </a>{" "}
                            to see some of the app's demos{" "}
                        </h1>
                    </div>
                </Modal>
            )}
            <nav className="footer__logo">
                <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                        e.preventDefault();
                        history.push(`/feed`);
                    }}
                >
                    <h3 id="logo-text">RealBnB</h3>
                </div>
            </nav>
            <nav
                className="footer__explore footer__section
      "
            >
                <p className="footer__section__title">Explore</p>
                <ul className="footer__ul">
                    <li className="footer__li">Beach</li>
                    <li className="footer__li">National Parks</li>
                    <li className="footer__li">Islands</li>
                    <li className="footer__li">Wildlife</li>
                </ul>
            </nav>
            <nav
                className="footer__about__us footer__section
      "
            >
                <p className="footer__section__title">About Us</p>
                <ul className="footer__ul footer__ul__technologies">
                    <li className="footer__li" onClick={() => history.push("/about-us")}>
                        Meet the team
                    </li>
                    <li className="footer__li" onClick={toggleShowAboutTheProject}>
                        About the Project
                    </li>
                    <li className="footer__li">
                        <a
                            className="footer__about__us__a"
                            href="https://github.com/RawaMem/RealBnb"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub Repo
                        </a>
                    </li>
                </ul>
            </nav>
            {showAboutTheProject && (
                <Modal onClose={toggleShowAboutTheProject}>
                    <div className="about__the__project">
                        <h1>
                            {" "}
                            This Airbnb clone is a side project designed to practice
                            front-end and back-end development. It showcases image uploads, listing uploads,
                            faves, comments, maps, booking and wishlists!
                        </h1>
                    </div>
                </Modal>
            )}
            <nav
                className="footer__help footer__section
      "
            >
                <p className="footer__section__title">Help</p>
                <ul className="footer__ul">
                    <li className="footer__li" onClick={toggleShowHowItWorks}>
                        How It Works
                    </li>
                    <li className="footer__li" onClick={() => history.push("/faq")}>
                        FAQ
                    </li>
                </ul>
            </nav>

            <nav
                className="footer__legal footer__section
      "
            >
                <p className="footer__section__title">Legal</p>
                <ul className="footer__ul">
                    <li className="footer__li">Terms & Conditions</li>
                    <li className="footer__li">Privacy Policy</li>
                </ul>
            </nav>
            <nav
                className="footer__extras footer__section
      "
            >
                <p className="footer__section__title">Extras</p>
                <ul className="footer__ul">
                    <li className="footer__li">Become a contributor</li>
                    <li className="footer__li">Partner with Us</li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
