import { createWishlistListingThunk, deleteWishlistListingThunk } from "../../../store/wishlists";
import { useParams } from "react-router-dom";

export function HeartSymbol({listing, wishListListing, dispatch}) {
    const { wishlistId } = useParams();
    async function handleHeartClick () {
        if (listing.id in wishListListing) {
          await dispatch(deleteWishlistListingThunk(wishlistId, listing.id));
          return;
        } else {
            await dispatch(createWishlistListingThunk(wishlistId, listing.id));
        }
      }
    
      return (
        <span onClick={handleHeartClick} 
          className="material-symbols-outlined" 
          style={listing.id in wishListListing ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48", color: "red" } : { color: "gray" }}
        >
          favorite
        </span>
      )
}
