import { useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { createWishlistThunk } from "../../../store/wishlists";
import "../WishList.css";

export function CreateNewWishList({ setOpenWishList, user, setModalOpen, listingId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const newWishListObj = {
      name,
      userId: user.id,
    };

    const response = await dispatch(createWishlistThunk(newWishListObj, listingId));
    if (response) {
      setName("");
      setOpenWishList(false);
      setModalOpen(null);
    }
  }
  return (
      <Modal onClose={() => {
        setOpenWishList(false);
        setModalOpen(null);
      }}>
        <form 
          onSubmit={onSubmit} 
          className="create-new-wishlist-main-container"
        >

          <div className="create-new-wishlist-title-container">
            <div className="create-new-wishlist-title-inner-container">
              <div className="create-wishlist-close-container">
                <span 
                  className="material-symbols-outlined"
                  id="material-symbols--outlined-close"
                  onClick={() => setModalOpen(null)}
                >
                  close
                </span>
              </div>
              <h5>Create wishlist</h5>
            </div>
          </div>
          <div className="create-new-wishlist-content-container">
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              spellCheck="true"
              maxLength="50"
              placeholder="Name"
            /> 
            <div>{name.length} / {50-name.length} characters</div>
          </div>

          <div className="create-new-wishlist-btn-container">
            <button 
              className={name.length > 1 ? "clearBackground-btn" : "create-new-wishlist-clearBackground-btn-disabled"} 
              style={{border:"none"}}
              onClick={() => setName("")}
              disabled={name.length < 1}
            >
                Clear
            </button>
            <button 
              type="submit"
              className={name.length < 1 ? "confirmAndNext-btn-disabled" : "confirmAndNext-btn"}
              style={{border:"none"}}
              disabled={name.length < 1}
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

  );
}
