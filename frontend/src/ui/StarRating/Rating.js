import { useState } from "react";


function Rating() {
    const [rating, setRating] = useState();

    const ratings = [1,2,3,4,5];

    const starIcons = (number) => {
        const props = {};
        props.onMonseEnter = () => setRating(number);
        props.onMonseLeave = () => setRating(rating);
        props.onClick = () => setRating(+number);
        return (
            <div {...props} key={number}>
                <span className="material-symbols-outlined">
                    star
                </span>
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