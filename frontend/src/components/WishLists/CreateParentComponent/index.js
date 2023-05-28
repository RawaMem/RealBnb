import { useState } from "react";
import { CreateNewWishList } from "../CreateNewWishList";
import { CreateWishListModal } from "../CreateWishListModal";

export function CreateWishListParentComponent({ user, setModalOpen, listingId }) {
  const [wishListModalOpen, setWishListModalOpen] = useState(true);
  const [newWishListOpen, setNewWishListOpen] = useState(false);

  function openCreateNewWishList() {
    setWishListModalOpen(false);
    setNewWishListOpen(true);
  } 

  return (
    <>
      {wishListModalOpen && <CreateWishListModal openCreateNewWishList={openCreateNewWishList} setWishListModalOpen={setWishListModalOpen} setModalOpen={setModalOpen} listingId={listingId} />}
      {newWishListOpen && <CreateNewWishList setOpenWishList={setNewWishListOpen} user={user} setModalOpen={setModalOpen} listingId={listingId} />}
    </>
  );
}
