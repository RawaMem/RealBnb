import { useState } from "react";
import { CreateNewWishList } from "../CreateNewWishList";
import { CreateWishListModal } from "../CreateWishListModal";

export function CreateWishListParentComponent({ user }) {
  const [wishListModalOpen, setWishListModalOpen] = useState(true);
  const [newWishListOpen, setNewWishListOpen] = useState(false);

  function openCreateNewWishList() {
    setWishListModalOpen(false);
    setNewWishListOpen(true);
  } 

  return (
    <>
      {wishListModalOpen && <CreateWishListModal openCreateNewWishList={openCreateNewWishList} />}
      {newWishListOpen && <CreateNewWishList setOpenWishList={setNewWishListOpen} user={user} />}
    </>
  );
}
