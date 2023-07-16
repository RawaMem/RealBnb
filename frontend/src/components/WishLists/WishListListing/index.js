import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory, Link } from "react-router-dom";
import DatePicker, { datePickerReducer } from "../../../ui/DatePicker";
import { MapBox } from "../../Maps/Mapbox";
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
  useValidListingSet,
} from "../../../hooks/WishList/WishListListing";
import {
  wishlistDateFormatter,
  toISODateString,
  determineNumberOfGuests,
} from "../../../utils/WishList";
import { useDetermineInitialCoordinates } from "../../../hooks/MapBox";
import { RenderListings } from "./RenderListings";
import "../WishList.css";

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
  const [zoom, setZoom] = useState(1);
  const [hoveredListing, setHoveredListing] = useState(null);
  const [showCreateWishListModal, setShowCreateWishListModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const user = useSelector((state) => state.session.user);


  const containerStyle = {
    width: "100%",
    height: "100%",
  };

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
  const [latitude, longitude] = useDetermineInitialCoordinates(filteredLists);
  const validListings = useValidListings(
    filteredLists,
    currentWishList,
    validListingPrices
  );
  const validListingSet = useValidListingSet(validListings);
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
    <div className="wishlisting-listing-main-container">
      <div className="wishlist-listing-left-container">
        <div className="wishlist-listing-option-container">
          <NavLink exact to="/wishlists" className="wishlist-listing-arrow-back-navlink">
            <span 
              className="material-symbols-outlined"
              id="material-symbols-arrow_back"
            >
              arrow_back
            </span>
          </NavLink>
          <span
            className="material-symbols-outlined"
            id="material-symbols-more_horiz"
            onClick={() => setShowModal(true)}
          >
            more_horiz
          </span>
        </div>
        <h3 className="wishlisting-listing-title">{currentWishList?.name}</h3>
        <p className="errors">{error}</p>
        <div className="wishListListing-button-container">
          <button 
            onClick={() => setShowCalendar((prev) => !prev)}
            className="wishlisting-listing-open-calendar"
          >
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
            <div className="wishlisting-listing-calendar">
              <DatePicker
                state={state}
                dispatch={dispatchCalendar}
                setShowCalendar={setShowCalendar}
                updateWishlistDates={updateWishlistDates}
              />
            </div>
          )}
          <button 
            onClick={() => setShowGuestModal(true)}
            className="wishlisting-listing-open-calendar"
          >
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
            <div className="edit-wishlist-modal-container">
              <div className="edit-wishlist-modal-title-container">
                <div className="edit-wishlist-modal-title-inner-container">
                  <div className="edit-wishlist-close-container">
                    <span 
                      className="material-symbols-outlined"
                      id="material-symbols--outlined-close"
                      onClick={() => setShowModal(false)}
                    >
                      close
                    </span>
                  </div>
                  <h5>Edit wishlist</h5>
                </div>
              </div>
              <div className="edit-wishlist-content-container">
                <label
                for="edit-wishlist-input"
                className="edit-wishlist-input-label"
                >Name</label>
                <input
                  id="edit-wishlist-input"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="edit-wishlist-content-input"
                  maxlength="50"
                />
                <p className="edit-wishlist-character-counter">{name.length} / {50-name.length} characters</p>
              </div>
              <div className="edit-wishlist-btn-container">
                <button 
                type="submit" 
                onClick={() => updateWishlist()}
                className={name.length >= 1 ? "edit-wishlist-btn" : "edit-wishlist-btn-disabled"}
                disabled={name.length < 1}
                >
                  Update this wishlist
                </button>
                <button type="submit" onClick={() => deleteWishlist()}
                  className="edit-wishlist-btn"
                
                >
                  Delete this wishlist
                </button>
              </div>
            </div>
          </Modal>
        )}

        {filteredLists && filteredLists.length === 0 && (
          <div className="wishlist-listing-empty-list-container">
            <h6>No saves yet</h6>
            <p style={{fontSize: "15px", color: "#36454F"}}>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
            <Link 
            to="/" 
            style={{
              textDecoration:"none",
              border: "1px solid black",
              width:"150px",
              height: "40px",
              display:"flex",
              flexDirection:"row",
              justifyContent: "center",
              alignItems:"center",
              fontSize:"18px",
              backgroundColor: "black",
              borderRadius:"10px",
              color: "white"
            }}
            className="wishlist-listing-empty-list-btn">
              Start exploring
            </Link>
          </div>
        )}
        {filteredLists && filteredLists.length > 0 && currentWishList && !currentWishList?.checkIn && !currentWishList?.adultGuests && (
          <RenderListings listings={filteredLists} wishListListing={wishListListing} user={user} setShowCreateWishListModal={setShowCreateWishListModal} setModalOpen={setModalOpen} dispatch={dispatch} setHoveredListing={setHoveredListing}/>
        )}
        {validListings.length > 0 && (
          <RenderListings listings={validListings} wishListListing={wishListListing} user={user} setShowCreateWishListModal={setShowCreateWishListModal} setModalOpen={setModalOpen} dispatch={dispatch} setHoveredListing={setHoveredListing}/>
        )}

        {exceedMaxGuestListings.length > 0 && (
          <div style={{margin:"3% 0 3% 3%", fontSize: "15px", fontWeight:"500", color:"red"}}>
            <div>None of these homes fit your trip</div>
            <p>
              If you’re flexible, try adjusting your wishlist filters to find
              other options.
            </p>
            <RenderListings listings={exceedMaxGuestListings} wishListListing={wishListListing} user={user} setShowCreateWishListModal={setShowCreateWishListModal} setModalOpen={setModalOpen} dispatch={dispatch} setHoveredListing={setHoveredListing}/>
          </div>
        )}
      </div>
      <div
        className="wishlist-listing-right-container"
      >
        <div
          className="wishlist-listing-nav-btn-container"
        >
          <button
            onClick={() => setZoom((prev) => prev + 1)}
            className="wishlist-listing-nav-btn-plus"
          >
            +
          </button>
          <button
            onClick={() => setZoom((prev) => prev - 1)}
            className="wishlist-listing-nav-btn-minus"

          >
            -
          </button>
        </div>        
          <MapBox
            latitude={latitude || 38.765}
            longitude={longitude || -122.45}
            style={containerStyle}
            zoom={zoom}
            coordinates={filteredLists}
            validListings={validListingSet}
            hoveredListing={hoveredListing}
            filteredLists={filteredLists}
          />     
      </div>
    </div>
  );
}
