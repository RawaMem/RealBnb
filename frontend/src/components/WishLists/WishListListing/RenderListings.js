import { NavLink } from "react-router-dom";
import ListingCard from "../../Listings/ListingCard";
import { HeartSymbol } from "./HeartSymbol";
import "../WishList.css";

export function RenderListings({listings, wishListListing, user, setShowCreateWishListModal, setModalOpen, dispatch, setHoveredListing}) {
    return (
      <div className="renderListing-main-container">
        {
        listings.map((listing) => (
            <div key={listing.id} className="render-listing--listing-card-container">
              <div
                onMouseOver={() => setHoveredListing(listing.id)}
                onMouseLeave={() => setHoveredListing(null)}
              >
                <NavLink
                  key={listing.id}
                  style={{ textDecoration: "none" }}
                  to={`/listings/${listing.id}`}
                >
                  <ListingCard
                    listing={listing}
                    wishListListing={wishListListing}
                  />
                </NavLink>
              </div>
              <div className="render-listing-heart-symbol">
                <HeartSymbol 
                  listing={listing} 
                  wishListListing={wishListListing} 
                  user={user} 
                  setShowCreateWishListModal={setShowCreateWishListModal} 
                  setModalOpen={setModalOpen} 
                  dispatch={dispatch} 
                />
              </div>

            </div>

        ))
        }
      </div>
    )
}
