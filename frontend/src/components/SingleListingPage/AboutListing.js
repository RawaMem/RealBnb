

function AboutListing({description}) {
    return (
        <div className="singleListing-about-container">
            <h3>About this place</h3>
            <p style={{color:"rgb(65,65,65)"}}>{description}</p>
        </div>
    )
};

export default AboutListing;