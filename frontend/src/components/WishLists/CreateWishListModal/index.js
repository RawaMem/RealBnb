import { Modal } from "../../../context/Modal";
import WishList from "../WishList";

export function CreateWishListModal({ setShowCreateWishListModal }) {
  return (
    <>
      <h3>Your wishlists</h3>
      <Modal onClose={() => setShowCreateWishListModal(false)}>
        <WishList setShowCreateWishListModal={setShowCreateWishListModal} />
      </Modal>
    </>
  );
}
