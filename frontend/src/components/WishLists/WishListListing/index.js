import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import DatePicker, { datePickerReducer } from "../../../ui/DatePicker";
import ListingCard from "../../Listings/ListingCard";
import {
  deleteWishlistThunk,
  getUserWishlistsThunk,
  updateWishlistThunk,
} from "../../../store/wishlists";
import { getListingsThunk } from "../../../store/listings";
import { Modal } from "../../../context/Modal";
import { Guests } from "../Guests";
import {
  useListingPrices,
  useFilteredLists,
  useListingSet,
  useExceedMaxGuestListings,
  useValidListings,
  useListingArray,
  useValidListingPrices,
} from "../../../hooks/WishList/WishListListing";
import {
  wishlistDateFormatter,
  toISODateString,
  determineNumberOfGuests,
} from "../../../utils/WishList";

export function WishListListing() {
  const { wishlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { wishLists, wishListListing } = useSelector(
    (state) => state.wishlists
  );
  const { id } = useSelector((state) => state.session.user);
  const { allListings } = useSelector((state) => state.listings);
  const { error } = useSelector((state) => state.wishlists);
  const currentWishList = wishLists[wishlistId];
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(currentWishList?.name || "");
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const initialState = {
    startDate: currentWishList?.checkIn
      ? new Date(currentWishList.checkIn)
      : new Date(),
    endDate: currentWishList?.checkOut
      ? new Date(currentWishList.checkOut)
      : null,
    focusedInput: null,
  };

  const [state, dispatchCalendar] = useReducer(datePickerReducer, initialState);

  useEffect(() => {
    if (currentWishList) {
      setName(currentWishList.name);
    }
  }, [wishLists]);

  useEffect(() => {
    dispatch(getUserWishlistsThunk(id));
  }, [dispatch, id, wishlistId]);

  useEffect(() => {
    dispatch(getListingsThunk());
  }, [dispatch, wishlistId]);

  useEffect(() => {
    if (currentWishList?.checkIn && currentWishList?.checkOut) {
      dispatchCalendar({
        type: "dateChange",
        payload: {
          startDate: new Date(
            new Date(currentWishList.checkIn).getTime() + 24 * 60 * 60 * 1000
          ),
          endDate: new Date(
            new Date(currentWishList.checkOut).getTime() + 24 * 60 * 60 * 1000
          ),
          focusedInput: null,
        },
      });
    }
  }, [currentWishList]);

  // Hooks
  const listingSet = useListingSet(currentWishList?.Listings);
  const listingPricesHashMap = useListingPrices(allListings, listingSet);
  const listingArray = useListingArray(listingPricesHashMap);
  const validListingPrices = useValidListingPrices(
    listingArray,
    currentWishList
  );
  const filteredLists = useFilteredLists(allListings, listingSet);
  const validListings = useValidListings(
    filteredLists,
    currentWishList,
    validListingPrices
  );
  const exceedMaxGuestListings = useExceedMaxGuestListings(
    filteredLists,
    currentWishList,
    validListingPrices
  );

  async function deleteWishlist() {
    await dispatch(deleteWishlistThunk(wishlistId));
    history.push("/wishlists");
  }

  async function updateWishlist() {
    const updatedWishlist = {
      ...currentWishList,
      name,
      checkIn: currentWishList.checkIn
        ? new Date(currentWishList.checkIn).toISOString().split("T")[0]
        : currentWishList.checkIn,
      checkOut: currentWishList.checkOut
        ? new Date(currentWishList.checkOut).toISOString().split("T")[0]
        : currentWishList.checkOut,
    };
    await dispatch(updateWishlistThunk(updatedWishlist));
    setShowModal(false);
  }

  async function updateWishlistDates({ startDate, endDate }) {
    const updatedWishlist = {
      ...currentWishList,
      checkIn: toISODateString(new Date(startDate)).split("T")[0],
      checkOut: toISODateString(new Date(endDate)).split("T")[0],
    };
    await dispatch(updateWishlistThunk(updatedWishlist));
  }

  return (
    <div>
      <span
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
        }}
        onClick={() => setShowModal(true)}
      >
        more_horiz
      </span>
      <h1>{currentWishList?.name}</h1>
      <p className="errors">{error}</p>
      <div className="wishListListing-button-container">
        <button onClick={() => setShowCalendar((prev) => !prev)}>
          {currentWishList &&
          currentWishList.checkIn &&
          currentWishList.checkOut
            ? wishlistDateFormatter(
                currentWishList.checkIn,
                currentWishList.checkOut
              )
            : "Date"}
        </button>
        {showCalendar && (
          <DatePicker
            state={state}
            dispatch={dispatchCalendar}
            setShowCalendar={setShowCalendar}
            updateWishlistDates={updateWishlistDates}
          />
        )}
        <button onClick={() => setShowGuestModal(true)}>
          {currentWishList
            ? determineNumberOfGuests(
                currentWishList.adultGuests,
                currentWishList.childGuests,
                currentWishList.petGuests
              )
            : "Guests"}
        </button>
        {showGuestModal && (
          <Modal onClose={() => setShowGuestModal(false)}>
            <Guests
              currentWishList={currentWishList}
              setShowGuestModal={setShowGuestModal}
            />
          </Modal>
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button type="submit" onClick={() => updateWishlist()}>
              Update this wishlist
            </button>
            <button type="submit" onClick={() => deleteWishlist()}>
              Delete this wishlist
            </button>
          </>
        </Modal>
      )}
      {validListings.map((listing) => (
        <NavLink
          key={listing.id}
          style={{ textDecoration: "none" }}
          to={`/listings/${listing.id}`}
        >
          <ListingCard listing={listing} wishListListing={wishListListing} />
        </NavLink>
      ))}

      {exceedMaxGuestListings.length > 0 && (
        <div>
          <h3>None of these homes fit your trip</h3>
          <p>
            If you’re flexible, try adjusting your wishlist filters to find
            other options.
          </p>
          {exceedMaxGuestListings.map((listing) => (
            <NavLink
              key={listing.id}
              style={{ textDecoration: "none" }}
              to={`/listings/${listing.id}`}
            >
              <ListingCard
                listing={listing}
                wishListListing={wishListListing}
              />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
