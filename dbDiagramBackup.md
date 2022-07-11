//// -- LEVEL 1
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
// Ref: merchant_periods.(merchant_id, country_code) > merchants.(id, country_code)



## Users

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| username     | varchar        | not null       |
| firstName    | varchar        | not null       |
| lastName     | varchar        | not null       |
| email        | varchar        | not null       |
| profileImg        | varchar        | not null       |
| host        | bool        | not null, default: false       |
| hashedpassword  | varchar     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## Listings

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| ownerId  | int     | not null  |
| previewImageId     | int        | not null       |
| name    | varchar        | not null       |
| description     | varchar        | not null       |
| price        | decimal        | not null       |
| serviceFee  | decimal     | not null  |
| cleaningFee  | decimal     | not null  |
| city  | varchar     | not null  |
| state  | varchar     | not null  |
| zipCode  | int     | not null  |
| longitude  | decimal     | not null  |
| latitude  | decimal     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

## Amenities

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| name  | varcahr     | not null  |
| iconUrl     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## ListingAmenities

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| amenityId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## Categories

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| name  | varcahr     | not null  |
| iconUrl     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## ListingCategories

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| categoryId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## Reviews

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| authorId  | int     | not null  |
| starRating     | int        | not null       |
| content     | int        | not null       |
| cleanliness        | int        | not null       |
| communication  | int     | not null  |
| checkIn  | int     | not null  |
| accuracy  | int     | not null  |
| value  | int     | not null  |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## Images

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| url  | varchar     | not null  |
| description     | varchar        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## ListingImages

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| imageId  | int     | not null  |
| listingId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |


## ReviewImages

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| imageId  | int     | not null  |
| reviewId     | int        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |

## Bookings

| Column Name  | Data Type      | Details       |
|   ---        |     ---        |     ---       |
| id           | int            | not null, pk, increment    |
| listingId  | int     | not null  |
| totalCost  | decimal     | not null  |
| pricePerDay  | decimal     | not null  |
| startDate     | datetime        | not null       |
| endDate     | datetime        | not null       |
| createdAt    | datetime       | not null       |
| updatedAt    | datetime       | not null       |
