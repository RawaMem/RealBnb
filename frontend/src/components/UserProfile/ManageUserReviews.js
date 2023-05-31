import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserReviewsThunk } from "../../store/reviews";
import UserReviewCard from "./UserReviewCard";


export default function ManageUserReviews() {
    const dispatch = useDispatch();
    const userReviewsState = useSelector(state => state.reviews.userReviews);
    const userReviewsArr = Object.values(userReviewsState);

    useEffect(() => {
        dispatch(getUserReviewsThunk());
    },[dispatch]);

    return (
        <div className="user-reviews-display-container">
            {userReviewsArr.length ? userReviewsArr.map(review => (
          
                <div key={review.id} className="userReviewsCard-container">
                    <UserReviewCard review={review} />
                </div>
               
            )) : <h5>You don't have any review yet</h5>}
        </div>
    );
};