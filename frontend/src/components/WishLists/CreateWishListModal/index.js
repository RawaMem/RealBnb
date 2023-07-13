import { Modal } from "../../../context/Modal";
import WishList from "../WishList";
import "../WishList.css";
export function CreateWishListModal({
  openCreateNewWishList,
  setWishListModalOpen,
  setModalOpen,
  listingId
}) {
  return (
  
    <Modal onClose={() => {
      setWishListModalOpen(false);
      setModalOpen(null);
    }}>
      <div className="create-wishlist-modal-container">

        <div className="create-wishlist-title-container">
          <div className="create-wishlist-title-inner-container">
            <div className="create-wishlist-close-container">
              <span 
                className="material-symbols-outlined"
                id="material-symbols--outlined-close"
                onClick={() => setModalOpen(null)}
              >
                close
              </span>
            </div>
            <h3>Add to wishlist</h3>
          </div>
        </div>

        <div className="create-wishlist-user-wishlist-container">
          <WishList 
            listingId={listingId} 
            setWishListModalOpen={setWishListModalOpen} 
            setModalOpen={setModalOpen}
          /> 
        </div>

        <div className="create-wishlist-btn-container">
          <button onClick={openCreateNewWishList}>Create new wishlist</button>
        </div>
      </div>
    </Modal>
    
  );
}
