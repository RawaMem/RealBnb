import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Guests.css";
import { updateWishlistThunk, clearError } from "../../../store/wishlists";

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
  return (
    <div className="guests-parent-container">
      {validation && <p className="errors">{validation}</p>}
      <div className="guests-container">
        <div>
          <label>Adults</label>
          <p>Ages 13 or above</p>
        </div>
        <div>
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min={1}
            max={15 - children}
          />
        </div>
      </div>
      <div className="guests-container">
        <div>
          <label>Children</label>
          <p>Ages 2 - 12</p>
        </div>
        <div>
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min={0}
            max={15 - adults}
          />
        </div>
      </div>

      <div className="guests-container">
        <div>
          <label>Infants</label>
          <p>Under 2</p>
        </div>
        <div>
          <input
            type="number"
            value={infants}
            onChange={(e) => setInfants(e.target.value)}
            min={0}
            max={5}
          />
        </div>
      </div>

      <div className="guests-container">
        <div>
          <label>Pets</label>
          <p>Bringing a service animal?</p>
        </div>
        <div>
          <input
            type="number"
            value={pets}
            onChange={(e) => setPets(e.target.value)}
            min={0}
            max={5}
          />
        </div>
      </div>

      <div className="guests-container">
        <button onClick={clearState}>Clear</button>
        <button onClick={saveGuestsInformation}>Save</button>
      </div>
    </div>
  );
}
