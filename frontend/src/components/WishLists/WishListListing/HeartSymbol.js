export function HeartSymbol({listing, wishListListing, user, setShowCreateWishListModal, setModalOpen, dispatch, setShowLogInModal}) {
    async function handleHeartClick () {
        if (!user) {
          setShowLogInModal(listing.id);
          return;
        }
        if (listing.id in wishListListing) {
          await dispatch(deleteWishlistListingThunk(wishListListing[listing.id].WishListListing.wishlistId, listing.id));
          return;
        }
        setShowCreateWishListModal(listing.id);
        setModalOpen("CreateWishListModal");
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
