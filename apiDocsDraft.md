# `RealBnb`

## Database Schema Design

## API Documentation

## FEATURE 0: USER AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: api/users/currentUser
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: api/users/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: api/users/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## FEATURE 1: LISTINGS FEATURE

### Get all Listings

Returns all the spots.

* Require Authentication: false
* Request
  * Method: GET
  * URL: api/listings
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
        {
        "Listing": {
      "ownerId": 1,
          "previewImageId": 1,
          "address": "111 Main St",
          "serviceFee": 123,
          "cleaningFee": 123,
          "city": "San Francisco",
          "state": "California",
          "zipCode": "99999",
          "country": "United States of America",
          "lat": 11.1111111,
          "lng": -111.1111111,
          "name": "Beach House",
          "description": "A nice place by the ocean",
          "createdAt": "2022-12-22 08:00:00",
          "updatedAt": "2022-12-29 11:00:00",
    },
        "Amenities" : [{
            "id": 1,
            "name": "pool"
        }],
        "Categories": [{
            "id": 1,
            "name": "beach"
        }],
        "ListingPrice": [{
            "id": 1,
            "pricePerDay": 200,
            "startDate": "11-24-2022",
            "endDate": "12-25-2022",
        }],
        "Images": [{
            "id": 1,
            "url": "image.jpg"
        }]

    }
      ]
    ```

### Get all Spots owned by the Current User

Returns all the spots owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: api/users/currentUser/listings
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
        {
        "Listing": {
      "ownerId": 1,
          "previewImageId": 1,
          "address": "111 Main St",
          "serviceFee": 123,
          "cleaningFee": 123,
          "city": "San Francisco",
          "state": "California",
          "zipCode": "99999",
          "country": "United States of America",
          "lat": 11.1111111,
          "lng": -111.1111111,
          "name": "Beach House",
          "description": "A nice place by the ocean",
          "createdAt": "2022-12-22 08:00:00",
          "updatedAt": "2022-12-29 11:00:00",
    },

        "ListingPrice": [{
            "id": 1,
            "pricePerDay": 200,
            "startDate": "11-24-2022",
            "endDate": "12-25-2022",
        }],
        "Images": [{
            "id": 1,
            "url": "image.jpg"
        }]

    }
      ]
    ```

### Get details of a Listing from an id

Returns the details of a listing specified by its id.

* Require Authentication: false
* Request
  * Method: api/listings/:listingId
  * URL: GET
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "previewImageId": 1,
      "address": "111 Main St",
      "pricePerDay": 123,
      "serviceFee": 123,
      "cleaningFee": 123,
      "city": "San Francisco",
      "state": "California",
      "zipCode": "99999",
      "country": "United States of America",
      "lat": 11.1111111,
      "lng": -111.1111111,
      "name": "Beach House",
      "description": "A nice place by the ocean",
      "createdAt": "2022-12-22 08:00:00",
      "updatedAt": "2022-12-29 11:00:00",
      "numReviews": 5,
      "cleanliness": 4.5,
      "communication": 4.5,
      "checkIn": 4.5,
      "accuracy": 4.5,
      "value": 4.5,

      "Images": [
        {"id": 1, "url": "image url"}
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      },
      "Amenities" : [
        {"id": 1, "name": "amenitiy name"}
      ]
    }
    ```

* Error response: Couldn't find a Listing with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Listing couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Listings

Creates and returns a new listings.

* Require Authentication: true
* Request
  * Method: POST
  * URL: api/listings
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "Listing": {
      "ownerId": 1,
          "previewImageId": 1,
          "address": "111 Main St",
          "serviceFee": 123,
          "cleaningFee": 123,
          "city": "San Francisco",
          "state": "California",
          "zipCode": "99999",
          "country": "United States of America",
          "lat": 11.1111111,
          "lng": -111.1111111,
          "name": "Beach House",
          "description": "A nice place by the ocean",
          "createdAt": "2022-12-22 08:00:00",
          "updatedAt": "2022-12-29 11:00:00",
    },
        "Amenities" : [{
            "name": "pool"
        }],
        "Categories": [{
            "name": "beach"
        }],
        "ListingPrice": [{
            "pricePerDay": 200,
            "startDate": "11-24-2022",
            "endDate": "12-25-2022",
        }],
        "Images": [{
            "url": "image.jpg"
        }]

    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "Listing": {
      "ownerId": 1,
          "previewImageId": 1,
          "address": "111 Main St",
          "serviceFee": 123,
          "cleaningFee": 123,
          "city": "San Francisco",
          "state": "California",
          "zipCode": "99999",
          "country": "United States of America",
          "lat": 11.1111111,
          "lng": -111.1111111,
          "name": "Beach House",
          "description": "A nice place by the ocean",
          "createdAt": "2022-12-22 08:00:00",
          "updatedAt": "2022-12-29 11:00:00",
    },
        "Amenities" : [{
            "id": 1,
            "name": "pool"
        }],
        "Categories": [{
            "id": 1,
            "name": "beach"
        }],
        "ListingPrice": [{
            "id": 1,
            "pricePerDay": 200,
            "startDate": "11-24-2022",
            "endDate": "12-25-2022",
        }],
        "Images": [{
            "id": 1,
            "url": "image.jpg"
        }]

    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "zipCode": "zipCode is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "pricePerDay": "Price per day is required",
        "serviceFee": "serviceFee per day is required",
        "pricePerDay": "Price per day is required",
      }
    }
    ```

### Edit a Listing

Updates and returns an existing listing.

* Require Authentication: true
* Require proper authorization: Listing must belong to the current user
* Request
  * Method: PUT
  * URL: api/listings/:listingId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {


          "previewImageId": 1,
          "address": "111 Main St",
          "pricePerDay": 123,
          "serviceFee": 123,
          "cleaningFee": 123,
          "city": "San Francisco",
          "state": "California",
          "zipCode": "99999",
          "country": "United States of America",
          "lat": 11.1111111,
          "lng": -111.1111111,
          "name": "Beach House",
          "description": "A nice place by the ocean",
          "createdAt": "2022-12-22 08:00:00",
          "updatedAt": "2022-12-29 11:00:00",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
          "ownerId": 1,
          "previewImageId": 1,
          "address": "111 Main St",
          "pricePerDay": 123,
          "serviceFee": 123,
          "cleaningFee": 123,
          "city": "San Francisco",
          "state": "California",
          "zipCode": "99999",
          "country": "United States of America",
          "lat": 11.1111111,
          "lng": -111.1111111,
          "name": "Beach House",
          "description": "A nice place by the ocean",
          "createdAt": "2022-12-22 08:00:00",
          "updatedAt": "2022-12-29 11:00:00",
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "zipCode": "zipCode is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "pricePerDay": "Price per day is required",
        "serviceFee": "serviceFee per day is required",
        "pricePerDay": "Price per day is required",
      }
    }
    ```

* Error response: Couldn't find a Listing with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Listing couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Listing

Deletes an existing listing.

* Require Authentication: true
* Require proper authorization: Listing must belong to the current user
* Request
  * Method: api/listings/:listingId
  * URL: DELETE
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Listing with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Listing couldn't be found",
      "statusCode": 404
    }
    ```
