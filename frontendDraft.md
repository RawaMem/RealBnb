## Home Page '/'

This page displays the splash page.
### Link:
/login
<br>/signup
<br>/listings


## Log-in Modal

This modal displays a log in form and allows user to log in.
### API:
POST /api/login

## Sign-up Modal

This modal displays a sign up form and allows user to sign up.
### API:
POST /api/signup

## New Listings Page '/listings/new'

This page displays a listing posting form and allows user to post a listing.
### API:
POST /listings/new

## All Listings Page '/listings'

This page displays all the Listings.
### Link:
/listings/:id

### API:
POST /api/wishlists
<br>POST /api/wishlistlistings

## User Listings Page '/users/:userId/listings'

This page displays all the Listings that were posted by the logged in user.
### Link:
/listings/:id

### API:
PUT /api/listings/:id
<br>DELETE /api/listings/:id


## Listing Detail Page '/listings/:id'
### Link:
/bookings/new
<br>/listings/:listingId/images

### API:
PUT /api/listings/:id
<br>DELETE /api/listings/:id
<br>POST /api/images
<br>POST /api/categories
<br>POST /api/amenities
<br>POST /api/wishlists
<br>POST /api/wishlistlistings


## Listing images Page '/listings/:listingId/images'
### Link:
/listings/:id
<br>/listings/:id/images/:imageId

### API:
DELETE /api/image/:imageId

## Listing Images Detail Page '/listings/:listingId/images/:imageId'
### Link:
/listings/:id/images

### API:
PUT /image/:imageId
<br>DELETE /image/:imageId


## User Bookings Page '/bookings'
This page displays all the bookings that were reserved by the logged in user.

### Link:
/bookings/:bookingId
<br>/listings/:listingId

### API:
DELETE /api/bookings/:id

## User Bookings Detail Page '/bookings/:id'\

### Link:
/user/bookings
<br>/listings/listingId

### API:
PUT /api/bookings/:id
<br>DELETE /api/bookings/:id
