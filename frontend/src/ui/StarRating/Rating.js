import { useState } from "react";


function Rating({rating, setStarRating}) {
    const [newRating, setNewRating] = useState(rating);

    const ratings = [1,2,3,4,5];

    const starIcons = (number) => {
        const props = {};
        props.onMouseEnter = () => setNewRating(number);
        props.onMouseLeave = () => setNewRating(rating);
        props.onClick = () => {
            setStarRating(+newRating);
            setNewRating(+number)
        } 

        return (
            <div {...props} key={number} className={newRating >= number ? "filled" : "empty"} id="each-icon-container-review" >
                <i className={newRating >= number ? "fa fa-star" : "fa fa-star-o"} id="star_icon-review" />
            </div>
        );
    };

    return (
        <div className="starIcons-star-rating-container">
            {ratings.map(rating => starIcons(rating))}
        </div>
    );
};

export default Rating;