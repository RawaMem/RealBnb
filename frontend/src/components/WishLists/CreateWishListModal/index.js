import { Modal } from "../../../context/Modal";
import WishList from "../WishList";
import "./CreateWishListModal.css";
export function CreateWishListModal({
  openCreateNewWishList,
  setWishListModalOpen,
  setModalOpen
}) {
  return (
    <>
      <h3>Your wishlists</h3>
      <Modal onClose={() => {
        setWishListModalOpen(false);
        setModalOpen(null);
      }}>
        <div>
          <label>
            <button onClick={openCreateNewWishList}>Create new wishlist</button>
          </label>
          <div className="modal-header">
            <WishList wishListStyle={{}} />
          </div>
        </div>
      </Modal>
    </>
  );
}
