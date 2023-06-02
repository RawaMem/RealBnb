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

  const listingSet = new Set();
  const listingPricesHashMap = {};
  const listingPricesSet = new Set();
  currentWishList?.Listings?.forEach((listing) => listingSet.add(listing.id));
  currentWishList?.Listings?.forEach((listing) => {
    listingSet.add(listing.id);
  });

  // const filteredLists = Object.values(allListings).filter((listing) =>
  //   listingSet.has(listing.id)
  // );
  const filteredLists = Object.values(allListings).filter((listing) =>
    listingSet.has(listing.id)
  );

  const listingsWithListingPrices = Object.values(allListings).filter(
    (listing) => listingSet.has(listing.id)
  );

  listingsWithListingPrices.forEach((listing) => {
    listingPricesHashMap[listing.id] = listing.ListingPrices;
  });

  const listingArray = Object.entries(listingPricesHashMap).flatMap(
    ([listingId, listings]) =>
      listings.map((listing) => ({ ...listing, listingId }))
  );

  listingArray.forEach((listing) => {
    if (
      new Date(listing.startDate) <= new Date(currentWishList.checkIn) &&
      new Date(listing.endDate) >= new Date(currentWishList.checkOut)
    ) {
      listingPricesSet.add(Number(listing.listingId));
    }
  });
  // listingPricesSet

  const arrayOfListingsThatExceedMaxGuests = filteredLists.filter((listing) => {
    return (
      listing.maxGuests <
        currentWishList?.adultGuests + currentWishList?.childGuests ||
      !listingPricesSet.has(listing.id)
    );
  });

  const arrayOfValidListings = filteredLists.filter((listing) => {
    return (
      listing.maxGuests >=
        currentWishList?.adultGuests + currentWishList?.childGuests &&
      listingPricesSet.has(listing.id)
    );
  });

  async function deleteWishlist() {
    await dispatch(deleteWishlistThunk(wishlistId));
    history.push("/wishlists");
  }

  async function updateWishlist() {
    const updatedWishlist = {
      ...currentWishList,
      name,
      checkIn: new Date(currentWishList.checkIn).toISOString().split("T")[0],
      checkOut: new Date(currentWishList.checkOut).toISOString().split("T")[0],
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
        <button onClick={() => setShowCalendar(true)}>
          {currentWishList 
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
        <button onClick={() => setShowGuestModal(true)}>{
          currentWishList ? determineNumberOfGuests(currentWishList.adultGuests, currentWishList.childGuests, currentWishList.petGuests) : "Guests"
        }</button>
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
      {arrayOfValidListings.map((listing) => (
        <NavLink
          key={listing.id}
          style={{ textDecoration: "none" }}
          to={`/listings/${listing.id}`}
        >
          <ListingCard listing={listing} wishListListing={wishListListing} />
        </NavLink>
      ))}

      {arrayOfListingsThatExceedMaxGuests.length > 0 && (
        <div>
          <h3>None of these homes fit your trip</h3>
          <p>
            If you’re flexible, try adjusting your wishlist filters to find
            other options.
          </p>
          {arrayOfListingsThatExceedMaxGuests.map((listing) => (
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
