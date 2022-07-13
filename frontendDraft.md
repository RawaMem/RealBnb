## Home Page '/'

This page displays the splash page.
Link:
/login
/signup
/listings


## Log-in Modal

This modal displays a log in form and allows user to log in.
API:
POST /api/login

## Sign-up Modal

This modal displays a sign up form and allows user to sign up.
API:
POST /api/signup

## New Listings Page '/listings/new'

This page displays a listing posting form and allows user to post a listing.
API:
POST /listings/new

## All Listings Page '/listings'

This page displays all the Listings.
Link:
/listings/:id

API:
POST /api/wishlists
POST /api/wishlistlistings

## User Listings Page '/users/:userId/listings'

This page displays all the Listings that were posted by the logged in user.
Link:
/listings/:id

API:
PUT /api/listings/:id
DELETE /api/listings/:id


## Listing Detail Page '/listings/:id'
Link:
/bookings/new
/listings/:listingId/images

API:
PUT /api/listings/:id
DELETE /api/listings/:id
POST /api/images
POST /api/categories
POST /api/amenities
POST /api/wishlists
POST /api/wishlistlistings


## Listing images Page '/listings/:listingId/images'
Link:
/listings/:id
/listings/:id/images/:imageId

API:
DELETE /api/image/:imageId

## Listing Images Detail Page '/listings/:listingId/images/:imageId'
Link:
/listings/:id/images

API:
PUT /image/:imageId
DELETE /image/:imageId


## User Bookings Page '/bookings'
This page displays all the bookings that were reserved by the logged in user.

Link:
/bookings/:bookingId
/listings/:listingId

API:
DELETE /api/bookings/:id

## User Bookings Detail Page '/bookings/:id'\

Link:
/user/bookings
/listings/listingId

API:
PUT /api/bookings/:id
DELETE /api/bookings/:id
