import { Modal } from "../../../context/Modal";
import WishList from "../WishList";
export function CreateWishListModal({
  openCreateNewWishList,
}) {
  return (
    <>
      <h3>Your wishlists</h3>
      <Modal>
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
