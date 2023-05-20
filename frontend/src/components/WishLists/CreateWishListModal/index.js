import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import { getUserWishlistsThunk } from "../../../store/wishlists";
import WishList from "../WishList";


export function CreateWishListModal({setShowCreateWishListModal}) {
    const dispatch = useDispatch();
    const {wishLists} = useSelector((state) => state.wishlists);
    const { id } = useSelector((state) => state.session.user);
    // const [showCreateWishListModal, setShowCreateWishListModal] = useState(false);

    useEffect(() => {
        dispatch(getUserWishlistsThunk(id));
    }, [dispatch, id]);

  return (
    <>
    <h3>Your wishlists</h3>
            <Modal onClose={() => setShowCreateWishListModal(false)}>
                <WishList setShowCreateWishListModal={setShowCreateWishListModal} />
            </Modal>

    </>
  )
}
