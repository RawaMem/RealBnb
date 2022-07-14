npx sequelize model:generate --name Image --attributes userId:int,listingId:int,url:string,description:string

npx sequelize model:generate --name Listing --attributes ownerId:int,previewImageId:string, name:string,description:string,serviceFee:decimal,serviceFee:decimal,cleaningFee:decimal,numRooms:int,maxGuests:int,city:string,state:string,zipCode:int,longitude:decimal,latitude:decimal


npx sequelize model:generate --name ListingPrice --attributes listingId:int,pricePerDay:decimal,startDate:datetime,endDate:datetime

npx sequelize model:generate --name Amenity --attributes name:string,iconUrl:string

npx sequelize model:generate --name ListingAmenity --attributes amenityId:int,listingId:int

npx sequelize model:generate --name Category --attributes name:string,iconUrl:string

npx sequelize model:generate --name ListingCategory --attributes categoryId:int,listingId:int

npx sequelize model:generate --name Review --attributes authorId:int,listingId:int,content:string,starRating:int,cleanliness:int,communication:int,checkIn:int,accuracy:int,value:int


npx sequelize model:generate --name Booking --attributes userId:int,listingId:int,totalCost:decimal,pricePerDay:decimal,paymentConfirmed:bool,startDate:datetime,endDate:datetime

npx sequelize model:generate --name ListingBrowseHistory --attributes userId:int,listingId:int

npx sequelize model:generate --name SearchHistory --attributes userId:int,destination:string,checkIn:datetime,checkOut:datetime,adultGuests:int,childGuests:int,infantGuests:int,petGuests:int

npx sequelize model:generate --name WishList --attributes userId:int,name:string,checkIn:datetime,checkOut:datetime,adultGuests:int,childGuests:int,infantGuests:int,petGuests:int

npx sequelize model:generate --name WishListListing --attributes wishlistId:int,listingId:int

npx sequelize model:generate --name DirectMessageThread --attributes hostId:int,guestId:int

npx sequelize model:generate --name DirectMessage --attributes senderId:int,directMessageThreadId:int,notified:bool,content:string

npx sequelize model:generate --name UserSetting --attributes userId:int,theme:string,recoveryQuestion1:string,hashedAnswer1:string,recoveryQuestion2:string,hashedAnswer2:string,recoveryQuestion3:string,hashedAnswer3:string

npx sequelize model:generate --name PasswordHistory --attributes userId:int,previousHashedPassword:string


npx sequelize seed:generate --name usersSeed
npx sequelize seed:generate --name listingSeed
npx sequelize seed:generate --name listingPricesSeed
npx sequelize seed:generate --name amenitiesSeed
npx sequelize seed:generate --name listingAmenitiesSeed
npx sequelize seed:generate --name categoriesSeed
npx sequelize seed:generate --name listingCategoriesSeed
npx sequelize seed:generate --name reviewsSeed
npx sequelize seed:generate --name imagesSeed
npx sequelize seed:generate --name bookingsSeed
npx sequelize seed:generate --name listingBrowseHistoriesSeed
npx sequelize seed:generate --name searchHistoriesSeed
npx sequelize seed:generate --name wishlistSeed
npx sequelize seed:generate --name wishlistListingSeed
npx sequelize seed:generate --name directMessageThreadSeed
npx sequelize seed:generate --name directMessageSeed
npx sequelize seed:generate --name userSettingSeed
npx sequelize seed:generate --name passwordHistorySeed
