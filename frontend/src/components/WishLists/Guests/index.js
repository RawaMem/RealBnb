import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateWishlistThunk, clearError } from "../../../store/wishlists";
import "../WishList.css";

export function Guests({ currentWishList, setShowGuestModal }) {
  const dispatch = useDispatch();
  const [adults, setAdults] = useState(currentWishList.adultGuests || 1);
  const [children, setChildren] = useState(currentWishList.childGuests || 0);
  const [infants, setInfants] = useState(currentWishList.infantGuests || 0);
  const [pets, setPets] = useState(currentWishList.petGuests || 0);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  function clearState() {
    setAdults(1);
    setChildren(0);
    setInfants(0);
    setPets(0);
  }

  async function saveGuestsInformation() {
    const guests = {
      adultGuests: Number(adults),
      childGuests: Number(children),
      infantGuests: Number(infants),
      petGuests: Number(pets),
    };
    const updatedWishlist = {
      ...currentWishList,
      ...guests,
      checkIn: currentWishList.checkIn
        ? new Date(currentWishList.checkIn).toISOString().split("T")[0]
        : currentWishList.checkIn,
      checkOut: currentWishList.checkOut
        ? new Date(currentWishList.checkOut).toISOString().split("T")[0]
        : currentWishList.checkOut,
    };
    const data = await dispatch(updateWishlistThunk(updatedWishlist));
    if (data.errors) {
      setValidation(data.errors);
    } else {
      setShowGuestModal(false);
    }
  }

 const minusBtnDisabled = (value, min) => value <= min;
 const handleMinus = setter => setter(prev => +prev - 1);
 const handleIncrement = setter => setter(prev => +prev + 1);
 const saveBtnDisabled = () => adults<1 || !children || !infants || !pets;

  return (
    <div className="guests-parent-container">
      {validation && <p className="errors">{validation}</p>}
      <div className="guests-parent-top-container">
        <div className="edit-guests-wishlist-close-container">
          <span 
            className="material-symbols-outlined"
            id="material-symbols--outlined-close"
            onClick={() => setShowGuestModal(null)}
          >
            close
          </span>
        </div>
      </div>
      <div className="guests-input-container">
        <div className="guests-input-inner-container">

          <div className="guests-container">
            <div className="guests-container-left-section">
              <label>Adults</label>
              <p>Ages 13 or above</p>
            </div>
            <div className="guests-container-right-section">
              <button 
              disabled={minusBtnDisabled(adults, 1)}
              onClick={() => handleMinus(setAdults)}
              className={minusBtnDisabled(adults, 1) ? "minusBtnDisabled" : null}
              >-</button>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                min={1}
                max={15 - children}
              />
              <button
                disabled={adults === (15 - children)}
                onClick={() => handleIncrement(setAdults)}
                className={adults === (15 - children) ? "plusBtnDisabled" : null}
              >+</button>
            </div>
          </div>
          <div className="guests-container">
            <div className="guests-container-left-section">
              <label>Children</label>
              <p>Ages 2 - 12</p>
            </div>
            <div className="guests-container-right-section">
              <button
                disabled={minusBtnDisabled(children, 0)}
                onClick={() => handleMinus(setChildren)}
                className={minusBtnDisabled(children, 0) ? "minusBtnDisabled" : null}
              >-</button>
              <input
                type="number"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                min={0}
                max={15 - adults}
              />
              <button
                disabled={children === (15 - adults)}
                onClick={() => handleIncrement(setChildren)}
                className={children === (15 - adults) ? "plusBtnDisabled" : null}
              >+</button>
            </div>
          </div>

          <div className="guests-container">
            <div className="guests-container-left-section">
              <label>Infants</label>
              <p>Under 2</p>
            </div>
            <div className="guests-container-right-section">
              <button
                disabled={minusBtnDisabled(infants, 0)}
                onClick={() => handleMinus(setInfants)}
                className={minusBtnDisabled(infants, 0) ? "minusBtnDisabled" : null}
              >-</button>
              <input
                type="number"
                value={infants}
                onChange={(e) => setInfants(e.target.value)}
                min={0}
                max={5}
              />
              <button
                disabled={infants === 5}
                onClick={() => handleIncrement(setInfants)}
                className={infants === 5 ? "plusBtnDisabled" : null}
              >+</button>
            </div>
          </div>

          <div className="guests-container">
            <div className="guests-container-left-section">
              <label>Pets</label>
              <p>Bringing a service animal?</p>
            </div>
            <div className="guests-container-right-section">
              <button
              disabled={minusBtnDisabled(pets, 0)}
              onClick={() => handleMinus(setPets)}
              className={minusBtnDisabled(pets, 0) ? "minusBtnDisabled" : null}
              >-</button>

              <input
                type="number"
                value={pets}
                onChange={(e) => setPets(e.target.value)}
                min={0}
                max={5}
              />
              <button
               disabled={pets === 5}
               onClick={() => handleIncrement(setPets)}
               className={pets === 5 ? "plusBtnDisabled" : null}
              >+</button>

            </div>
          </div>
        </div>

      </div>

      <div className="guests-btn-container">
        <div className="guests-btn-inner-container">
          <button 
            className="guests-btn-clear" 
            onClick={clearState}>
              Clear
          </button>
          <button 
            onClick={saveGuestsInformation}
            className={!saveBtnDisabled() ? "guests-btn-save" : "guests-btn-save-disabled"}
            // disabled={saveBtnDisabled()}
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
}
