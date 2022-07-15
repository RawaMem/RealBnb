# State Shape for RealBnb

## Listings
```js
"listings": {
   1 : {                            // this would be the listing ID
       "id": 1,
        "previewImageId": 1,
        "name": "Little Slice of Paradise",
        "description": "Welcome to my little slice of paradise",
        "pricePerDay": 99.99,
        "serviceFee": 75.45,
        "cleaningFee": 34.99,
        "city": "San Diego",
        "state": "California",
        "zipCode": 91911,
        "longitude": -117.096345,
        "latitude": 32.608705,
        "Owner": {
            "id": 1,
            "username": "demo-user",
            "firstName": "Demo",
            "lastName": "User",
            "email": "demo@user.io",
            "profileImg": "image url",
            "host": true
        },
        "images": {
            1: {                    // this would be the image ID
                "listingId": 1,     // or null
                "reviewId": null,   // or a review ID
                "url": "image url",
                "description": "A beautiful image"
            }
        }
   } 
}
```

## Bookings

```js
"bookings": {
    1: {
        "id": 1,
        "totalCost": 1000,
        "pricePerDay": 99.99,
        "paymentConfirmed": true,
        "startDate": "2023-07-11",
        "endDate": "2023-07-21",
        "Owner": {
            "id": 1,
            "username": "demo-user",
            "firstName": "Demo",
            "lastName": "User",
            "email": "demo@user.io",
            "profileImg": "image url",
            "host": true
        },
        "Listing": {
            "id": 1,
            "previewImageId": 1,
            "name": "Little Slice of Paradise",
            "description": "Welcome to my little slice of paradise",
            "pricePerDay": 99.99,
            "serviceFee": 75.45,
            "cleaningFee": 34.99,
            "city": "San Diego",
            "state": "California",
            "zipCode": 91911,
            "longitude": -117.096345,
            "latitude": 32.608705
        }
    }
}
```

## Reviews
```js
"reviews": {
    1: {                        // ID of review
        "id": 1,
        "starRating": 5,
        "content": 5,
        "cleanliness": 5,
        "communication": 5,
        "checkIn": 1,
        "accuracy": 5,
        "value": 5,
        "Author": {
            "id": 1,
            "username": "demo-user",
            "firstName": "Demo",
            "lastName": "User",
            "email": "demo@user.io",
            "profileImg": "image url",
            "host": true
        },
        "Listing": {
            "id": 1,
            "previewImageId": 1,
            "name": "Little Slice of Paradise",
            "description": "Welcome to my little slice of paradise",
            "pricePerDay": 99.99,
            "serviceFee": 75.45,
            "cleaningFee": 34.99,
            "city": "San Diego",
            "state": "California",
            "zipCode": 91911,
            "longitude": -117.096345,
            "latitude": 32.608705
        }
    }
}
```

## WishLists

```js
"wishlists": {
    1: {
        "id": 1,
        "name": "Vacay Spots",
        "checkIn": "2023-07-11",
        "checkOut": "2023-07-21",
        "adultGuests": 1,
        "childGuests": 1,
        "infantGuests": 1,
        "petGuests": 1,
        "User": {
            "id": 1,
            "username": "demo-user",
            "firstName": "Demo",
            "lastName": "User",
            "email": "demo@user.io",
            "profileImg": "image url",
            "host": true
        }
}
```

## Chats

```js
"chats": {              // to differentiate between the two types of convos
    "hosting": {
        1: {            // this would be the chatId
            "Host": {
                "id": 1,
                "username": "demo-user",
                "firstName": "Demo",
                "lastName": "User",
                "email": "demo@user.io",
                "profileImg": "image url",
                "host": true
            },
            "User": {
                "id": 2,
                "username": "fake-user",
                "firstName": "Fake",
                "lastName": "User",
                "email": "fake@user.io",
                "profileImg": "image url",
                "host": true
            },
            "Messages": {
                1: {
                    "senderId": 1,
                    "message": "How many towels will you need?",
                    "createdAt": "2023-07-11 15:22:32:00UTC"
                },
                2: {
                    "senderId": 2,
                    "message": "4 would be great!",
                    "createdAt": "2023-07-11 15:25:52:00UTC"
                }
            }
        }
    },
    "renting": {
        1: {            // this would be the chatId
            "Host": {
                "id": 2,
                "username": "fake-user",
                "firstName": "Fake",
                "lastName": "User",
                "email": "fake@user.io",
                "profileImg": "image url",
                "host": true
            },
            "User": {
                "id": 1,
                "username": "demo-user",
                "firstName": "Demo",
                "lastName": "User",
                "email": "demo@user.io",
                "profileImg": "image url",
                "host": true
            },
            "Messages": {
                1: {
                    "senderId": 2,
                    "message": "How many towels will you need?",
                    "createdAt": "2023-07-11 15:22:32:00UTC"
                },
                2: {
                    "senderId": 1,
                    "message": "4 would be great!",
                    "createdAt": "2023-07-11 15:25:52:00UTC"
                }
            }
        }
    }
}
```