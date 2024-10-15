import React, { useState } from "react";
import "./Faq.css";

// FAQ Data
const faqData = {
    general: [
        {
            title: "What is this project?",
            description:
                "This is a clone of Airbnb created to demonstrate full-stack development skills.",
        },
        {
            title: "What technologies are used?",
            description:
                "This project is built using React, Redux, Express, PSQL, sequelize, CSS, and AWS S3.",
        },
        {
            title: "Are there any privacy concerns?",
            description:
                "Since this is for demonstration purposes, I would suggest not uploading any sensitive data.",
        },
        {
            title: "Can I contribute to this project?",
            description:
                "You are welcome to contribute with the best house/apartment images you have!",
        },
    ],
};

// Helper FAQ Section Component
function FAQSection({ sectionTitle, items }) {
    const [openItemsIndexes, setOpenItemsIndexes] = useState([]);

    const handleToggle = (index) => {
        if (openItemsIndexes.includes(index)) {
            setOpenItemsIndexes((prev) => {
                return prev.filter((i) => index !== i);
            });
        } else {
            setOpenItemsIndexes((prev) => {
                return [...prev, index]
            });
        }
    };

    const getIcon = (index) => {
        return openItemsIndexes.includes(index) ? (
            <svg className="FAQ__icons" xmlns="http://www.w3.org/2000/svg" width="30" height="31" fill="none" viewBox="0 0 30 31"><path fill="#3e70bb" d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z" /></svg>
        ) : (
            <svg className="FAQ__icons"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="31"
                fill="none"
                viewBox="0 0 30 31"
            >
                <path
                    fill="#3e70bb"
                    d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.2 12.2 0 0 0 15 3.312Zm4.688 13.124h-9.375a.938.938 0 0 1 0-1.875h9.374a.938.938 0 0 1 0 1.876Z"
                />
            </svg>
        );
    };

    return (
        <div className="FAQ__container">
            <div className="FAQ__modal">
                <header className="modal-header-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" fill="none" viewBox="0 0 40 41">
                        <path fill="#3e70bb" d="M37.5 20.5a2.467 2.467 0 0 1-1.64 2.344l-9.913 3.604-3.603 9.911a2.5 2.5 0 0 1-4.688 0l-3.604-9.922-9.911-3.593a2.5 2.5 0 0 1 0-4.688l9.921-3.604 3.594-9.911a2.5 2.5 0 0 1 4.688 0l3.604 9.921 9.911 3.594A2.467 2.467 0 0 1 37.5 20.5Z" />
                    </svg>
                    <h1 className="title">{sectionTitle}</h1>
                </header>
                {items.map((item, index) => (
                    <div key={index} className="accordion-item">
                        <div
                            className="accordion-title-and-icon"
                            onClick={() => handleToggle(index)}
                        >
                            <h2 className="accordion-title">{item.title}</h2>
                            {getIcon(index)}
                        </div>
                        {openItemsIndexes.includes(index) && (
                            <p className="description">{item.description}</p>
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Faq() {
    return (
        <FAQSection sectionTitle="General FAQ" items={faqData.general} />
    );
}


