
# Database Schema

## `Users`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| username     | varchar        | not null, unique       |
| firstName    | varchar        | not null       |
| lastName     | varchar        | not null       |
| email        | varchar        | not null, unique       |
| profileImg        | varchar        | not null       |
| host        | bool        | not null, default: false       |
| superHost        | bool        | not null, default: false       |
| identityVerified        | bool        | not null, default: false       |
| aboutMe        | string        | not null, default: false       |
| duringStay        | string        | not null, default: false       |
| hashedpassword  | varchar     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Users.id has many Listings.ownerId
Users.id has many Reviews.authorId
Users.id has many Images.userId
Users.id has many Booking.userId
Users.id has many ListingBrowseHistories.userId
Users.id has many SearchHistories.userId
Users.id has many WishLists.userId
Users.id has many ChatSessions.guestId
Users.id has many SessionMessages.senderId
Users.id has many DirectMessageThreads.hostId
Users.id has many DirectMessageThreads.guestId
Users.id has many DirectMessages.senderId
Users.id has many UserSettings.userId
Users.id has many PasswordHistories.userId


## `Listings`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| ownerId  | int     | not null  |
| previewImageId     | int        | not null       |
| name    | varchar        | not null       |
| description     | varchar        | not null       |
| maxGuests        | int        | not null       |
| airCover        | bool        | not null       |
| serviceFee  | decimal     | not null  |
| cleaningFee  | decimal     | not null  |
| city  | varchar     | not null  |
| state  | varchar     | not null  |
| zipCode  | int     | not null  |
| longitude  | decimal     | not null  |
| latitude  | decimal     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Listings.ownerId belongs to Users.id
Listings.previewImageId belongs to Images.id
Listings.id has many ListingPrices.listingId
Listings belongs to many Amenities through ListingsAmenities
Listings belongs to many Categories through ListingsCategories
Listings.id has many Reviews.listingId
Listings.id has many Booking.listingId
Listings belongs to many WishLists through WishlistListings
Listings.id has many ChatSessions.listingId
Listing.id has many Images.listingId

something to consider: we can have 2 listings in the same place, potentitially for people who rent out rooms in the same location
so no unique constraint at this point

## `Rooms`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| ownerId  | int     | not null  |
| listingId     | int        | not null       |
| name    | varchar        | not null       |
| bed     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |



## `ListingPrices`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| listingId  | int     | not null  |
| pricePerDay        | decimal        | not null       |
| startDate     | datetime        | not null       |
| endDate     | datetime        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

ListingPrices.listingId belongs to Listings.id


## `Amenities`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| name  | varcahr     | not null  |
| iconUrl     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Amenities belongs to many Listings through ListingsAmenities


## `ListingAmenities`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| amenityId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## `Categories`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| name  | varcahr     | not null  |
| iconUrl     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Categories belongs to many Listings through ListingsCategories



## `ListingCategories`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| categoryId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## `Reviews`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| authorId  | int     | not null  |
| listingId  | int     | not null  |
| starRating     | int        | not null       |
| content     | int        | not null       |
| cleanliness        | int        | not null       |
| communication  | int     | not null  |
| checkIn  | int     | not null  |
| accuracy  | int     | not null  |
| location  | int     | not null  |
| value  | int     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Reviews.authorId belongs to Users.id
Reviews.listingId belongs to Listings.id
Review.id has many Images.reviewId




## `Images`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| listingId           | int            |  nullable   |
| reviewId           | int            |  nullable   |
| userId  | int     | not null  |
| url  | varchar     | not null  |
| description     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Images.listingId belongs to Listing.id
Images.reviewId belongs to Review.id
Images.userId belongs to Users.id
Images.id has many Listings.previewImageId




<!-- ## `ListingImages`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| imageId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       | -->



<!-- ## `ReviewImages`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| imageId  | int     | not null  |
| reviewId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       | -->


## `Bookings`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| userId           | int            | not null  |
| listingId  | int     | not null  |
| totalCost  | decimal     | not null  |
| pricePerDay  | decimal     | not null  |
| paymentConfirmed  | bool     | not null  |
| startDate     | datetime        | not null       |
| endDate     | datetime        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

Booking.userId belongs to Users.id
Booking.listingId belongs to Listings.id

## `ListingBrowseHistories`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| userId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

ListingBrowseHistories.userId belongs to Users.id



## `SearchHistories`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| userId  | int     | not null  |
| destination     | varchar        | nullable       |
| checkIn     | datetime        | nullable       |
| checkOut     | datetime        | nullable       |
| adultGuests     | int        | nullable       |
| childGuests     | int        | nullable       |
| infantGuests     | int        | nullable       |
| petGuests     | int        | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

SearchHistories.userId belongs to Users.id



## `WishLists`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| userId  | int     | not null  |
| name     | varchar        | not null       |
| destination     | varchar        | nullable       |
| checkIn     | datetime        | nullable       |
| checkOut     | datetime        | nullable       |
| adultGuests     | int        | nullable       |
| childGuests     | int        | nullable       |
| infantGuests     | int        | nullable       |
| petGuests     | int        | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

WishLists.userId belongs to Users.id
WishLists belongs to many Listing through WishlistListings



## `WishlistListings`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| wishlistId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

<!-- ## `ChatSessions`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| guestId     | int        | nullable       |
| listingId     | int        | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

ChatSessions.guestId belongs to Users.id
ChatSessions.listingId belongs to Listings.id
(we might not need hostId because the associated listing has the hostId/ ownerId)


## `SessionMessages`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| senderId  | int     | not null  |
| chatSessionId  | int     | not null  |
| notified  | bool     | not null  |
| content     | varchar        | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

SessionMessages.senderId belongs to Users.id
SessionMessages.chatSessionId belongs to ChatSessions.id -->



## `DirectMessageThreads`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| hostId  | int     | not null  |
| guestId     | int        | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

DirectMessageThreads.hostId belongs to Users.id
DirectMessageThreads.guestId belongs to Users.id
DirectMessageThreads.id has many DirectMessages.directMessagesThreadId




## `DirectMessages`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| senderId  | int     | not null  |

| directMessagesThreadId  | int     | not null  |
| notified  | bool     | not null  |
| content     | varchar        | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

DirectMessages.senderId belongs to Users.id
DirectMessages.directMessagesThreadId belongs to DirectMessageThreads.id


## `UserSettings`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| userId  | int     | not null  |
| theme  | varchar     | not null  |
| recoveryQuestion1  | varchar     | not null  |
| hashedAnswer1     | string.binary        | nullable       |
| recoveryQuestion2  | varchar     | not null  |
| hashedAnswer2     | string.binary         | nullable       |
| recoveryQuestion3  | varchar     | not null  |
| hashedAnswer3     | string.binary         | nullable       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

UserSettings.userId belongs to Users.id


## `PasswordHistories`

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| userId  | int     | not null  |
| previousPassword  | string.binary     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

PasswordHistories.userId belongs to Users.id







<!-- code below is for db diagram but wont allow us to make more than 10 tables -->


<!-- //// -- LEVEL 1
//// -- Tables and References

// Creating tables
Table Users as U {
  id int [pk, increment] // auto-increment
  firstName varchar
  lastName varchar
  hashedpassword varchar
  created_at timestamp
  country_code int
}

Table Listings {
  code int [pk]
  name varchar
  continent_name varchar
  ownerId int [ref: > Users.id]
 }


 Table Images {
  code int [pk]
  name varchar
  continent_name varchar
 }

 Table Bookings {
  code int [pk]
  name varchar
  continent_name varchar
 }

 Table Reviews {
  code int [pk]
  name varchar
  continent_name varchar
 }

 Table Wishlists {
  code int [pk]
  name varchar
  continent_name varchar
 }

 Table Categories {
  code int [pk]
  name varchar
  continent_name varchar
 }

 Table Searches {
  code int [pk]
  name varchar
  continent_name varchar
 }

  Table chatSessions {
  code int [pk]
  name varchar
  continent_name varchar
 }

  Table personalMessages {
  code int [pk]
  name varchar
  continent_name varchar
 }

  Table chatMessages {
  code int [pk]
  name varchar
  continent_name varchar
 }

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
// Ref: U.country_code > countries.code
// Ref: merchants.country_code > countries.code

//----------------------------------------------//

//// -- LEVEL 2
//// -- Adding column settings

// Table Images {
//   order_id int [ref: > orders.id] // inline relationship (many-to-one)
//   product_id int
//   quantity int [default: 1] // default value
// }

// Ref: order_items.product_id > products.id

// Table orders {
//   id int [pk] // primary key
//   user_id int [not null, unique]
//   status varchar
//   created_at varchar [note: 'When order created'] // add column note
// }

//----------------------------------------------//

//// -- Level 3
//// -- Enum, Indexes

// Enum for 'products' table below
// Enum products_status {
//   out_of_stock
//   in_stock
//   running_low [note: 'less than 20'] // add column note
// }

// // Indexes: You can define a single or multi-column index
// Table products {
//   id int [pk]
//   name varchar
//   merchant_id int [not null]
//   price int
//   status products_status
//   created_at datetime [default: `now()`]

//   Indexes {
//     (merchant_id, status) [name:'product_status']
//     id [unique]
//   }
// }

// Table merchants {
//   id int
//   country_code int
//   merchant_name varchar

//   "created at" varchar
//   admin_id int [ref: > U.id]
//   Indexes {
//     (id, country_code) [pk]
//   }
// }

// Table merchant_periods {
//   id int [pk]
//   merchant_id int
//   country_code int
//   start_date datetime
//   end_date datetime
// }

// Ref: products.merchant_id > merchants.id // many-to-one
// //composite foreign key
// Ref: merchant_periods.(merchant_id, country_code) > merchants.(id, country_code) -->
