import { useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { createWishlistThunk } from "../../../store/wishlists";
export function CreateNewWishList({ setOpenWishList, user, setModalOpen, listingId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const newWishListObj = {
      name,
      userId: user.id,
      checkIn: new Date("2026-05-28").toISOString().split("T")[0],
      checkOut: new Date("2026-06-28").toISOString().split("T")[0],
      adultGuests: 1,
      childGuests: 0,
      infantGuests: 0,
      petGuests: 0,
    };

    const response = await dispatch(createWishlistThunk(newWishListObj, listingId));
    if (response) {
      setName("");
      setOpenWishList(false);
      setModalOpen(null);
    }
  }
  return (
    <>
      <h1>Create new wish list</h1>
      <Modal onClose={() => {
        setOpenWishList(false);
        setModalOpen(null);
      }}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </Modal>
    </>
  );
}
