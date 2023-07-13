import { NavLink } from "react-router-dom";
import ListingCard from "../../Listings/ListingCard";
import { HeartSymbol } from "./HeartSymbol";

export function RenderListings({listings, wishListListing, user, setShowCreateWishListModal, setModalOpen, dispatch, setHoveredListing}) {
    return listings.map((listing) => (
        <div key={listing.id}>
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
          <HeartSymbol 
            listing={listing} 
            wishListListing={wishListListing} 
            user={user} 
            setShowCreateWishListModal={setShowCreateWishListModal} 
            setModalOpen={setModalOpen} 
            dispatch={dispatch} 
          />
        </div>
      ))
}

