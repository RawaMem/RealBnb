# User Stories

## Users

### Sign Up

- As a registered and unauthorized user, I would like to find a Sign up button by clicking on a profile logo on the navigation bar. I should then see a drop down modal of choices where the Sign up button is located at. 
- I want to be redirected to `users/signup` after clicking the Sign up button.
- I want to be able to sign up for the website via the sign-up form.

    - When I'm on the `users/signup` page:

        - I would like to be able to enter my email, first name, last name and preferred password on a clearly laid out form.
        - I would like the website to log me in upon successful completion of the sign-up form.
            - So that I can seamlessly access the site's functionality.    
    - When I enter invalid data on the sigh-up form:

        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries(except my password).
            - So I can try again without having to refill forms that I had entered valid data into.

### Log in

- As a registered and unauthorized user, I would like to find a Log in button by clicking on a profile logo on the navigation bar. I should then see a drop down modal of choices where the Log in button is located at. 
- I want to be redirected to `users/login` after clicking the Log in button.
- I want to be able to log in to the website via the log-in form.

    - When I'm on the `users/login` page:

        - I would like to be able to enter my email and password on a clearly laid out form.
        - I would like the website to log me in to all listings page `listings` upon successful completion of the log-in form.
            - So that I can seamlessly review all listed rooms and access the site's functionality.
    - When I enter invalid data on the log-in form:

        - I would like the website to inform me of the validations I failed to pass.
            - So I can try again based on the error messages received from previous attempt.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `users/signup` and `users/login` pages to allow me to visit the site as a guest without signing up or logging in.

    - When I'm on either the `users/signup` or `users/login`:
    
        - I can click on a `Continue as Guest` button to log me in and allow me certain accesses as a normal user.
            - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to be able to click on my profile logo on the navigation bar and see a drop down Modal of choices, where I can find a `Log out` button that will let me log out of the website.

    - While on any page of the site:
        - I can log out of my account via the same log out button located at the same place and remain on the same page.
            - So that I won't lose access to the page I was reviewing before I logged out.


## Listing

### Create a listing

- As a logged in user, I want to be able to create new listings.
    - I can click on a `Become a Host` button on the navigation bar. 

    - I want to be redirected to a video introduction page where I can find a `Let's go!` button, this button will redirect me to the listing form.
    
    - When I'm on the listing form:
        - I would like to be able to select the type of property I would like to list.
            - I want to have choices of Home, Cabin, Villa, Condominium.

        - I would like to be able to enter my address, city, state, zip code and select country/region.

            - When I enter invalid data on the above columns:

                - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries.

                - So I can try again without having to refill forms that I had entered valid data into.

        - I would like to be able to select guests limit, and beds, bedrooms and bathrooms numbers.

        - I would like to be able to select all the amenity names and its respective icons that my property offers.

        - I would like to drag and drop at least 5 photos to showcase the property I'm listing.

            - When I uploaded less than 5 photos on the image uploading page:

                - I would like the website to inform me of the validations I failed to pass, and repopulate the form with the photos I have previously uploaded.

                - So I can add sufficient amount of photos without having to reload the photos I have previously selected and uploaded.

        - I would like to be able to create a name for my listing.
            - I can't enter more than 50 characters.

        - I would like to be able to create a description for my listing.
            - I can't enter more than 500 characters to describe my listing.

        - I would like to be able to set a price for my listing.
        - I have access to a `Save your listing` button that will confirm my new listing.

### Edit/Delete listing
- As a logged in user, and a host, I want to be able to edit my existing listings.
    - I can click on a `Switch to hosting` button on the navigation bar.

    - I want to be redirected to a host profile page. 
    - When I'm on the host profile page:
        - I can find a `Menu` dropdown button on the navbar, where I will be able to find a Listing option.
        - I want to see all my listings on `/users/:userId/listings` after I click on the Listing option where I will have choices to either edit or delete existing listings.

### Review listings
- As a logged in user, I want to be able to see all existing listings of Realbnb on `/listings`.
    - When I'm on `/listings` page:
        - I want to be able to filter review results by price range, type of place, number of bedrooms and beds, perperty type, and the essentials of amenities.

### Review a single listing
- As a logged in user, I want to be able to see details of a listing on `/listings/:id` by click on any of the listings on `/listings`page.
    - When I'm on the `/listings` page:
        - I would like to review the name, city, state, country, images, accommodation size, price, and reviews from other guests of the property.
        - I also want to see a booking form on this page.

## Bookings

### Make a booking. 
- As a logged in user, I want to be see a booking form on every `/listings/:id` page.
    - When I'm on the booking form:
        - I want to be able to see the unit price/night, and select my check-in date, checkout date, and guests number.
        - I want to see the total charge based on my selections.

### Review all bookings.
- As a logged in user, I want to like to be able to click on a profile logo on the navbar and find a `review my bookings` option among the selections.
- I will be redirected to `/bookings` page when I click on `review my bookins` option, where I can review all my bookings.

### Review/ Edit/ Delete a single booking
#### Review
- As a logged in user, when I'm on `/bookings` page, I want to be able to click on any of the listed bookings and be redirected to `/bookings/:bookingId` where I can review details of the selected booking. 

#### Edit/ Delete
- As a logged in user, when I'm on `/bookings/:bookingId`, I want to have access to edit or to delete the selected booking.

## Reviews

### Review all comments for a listing.
- As a logged in user, when I'm on the `/listings/:id` page, I woule like to see the average score (1-5) of the listing that I'm currently reviewing; I would also like to see a clickable link of the number of reviews that are written for the listing.
- When I click on the review link, I would like to see a portal slide up.
    - When I'm on the portal:
        - I would like to see the average score for the Cleanliness, Accuracy, Communication, Location, Check-in and Value of the listing.
        - I would like to see all reviews for the listing.
            - For each of the reviews, I would like to see the user name and profile photo, date when the review is written and content of the review.

### Create a review for a listing.
- As a logged in user, I would like to be able to write down my experience and reviews after checking out.

### Edit/Delete a review for a listing.
- As a logged in user, I would like to be able to edit and delete any of the reviews I have written in my profile.

## Wishlists

### Review wishlists

- As a logged in user, I would like to find a `Wishlists` selection when I click on my profile logo on navbar.
- I would like to be redirected to `/wishlists` page after clicking on the `Wishlists` selection.
    - When I'm on `/wishlists` page:
        - I would be able to review all my wishlists folders.
        - I will be redirected to `/wishlists/:wishlistsId` page after I click on any of my wishlists folders.
        - When I'm on `/wishlists/:wishlistsId` page:
            - I should be able to see all listings saved under this wishlists folder and their locations marked on a Google map. 
            - I can click on any of the saved listing and be redirected to the `/listing/:id` page.

### Edit/Delete a wishlist folder

- As a logged in user, when I'm on `/wishlists/:wishlistsId` page:
    - I would like to have a setting button. When I click on the setting button, I would like to see a Modal.
        - When I'm on the Modal:
            - I would like to be able to rename and delete my wishlist folder.
            - When I enter more than 50 characters to rename my wishlist folder:
                - I would like the website to inform me of the validations I failed to pass.
            - I would like to have access to a `Cancel` button in case I decide not to make any change to my wish list folder.

### Remove a listing from a wishlist folder

- As a logged in user, when I'm on the `/wishlists/:wishlistsId` page:
    - I would like to see a heart shaped button highlighted on every saved listings.
    - I would like to be able to remove a saved listing from the wishlist folder by clicking on the heart shaped button.  

### Create a wishlist folder

- As a logged in user, when I'm on the `/listings/:id` page, I would like to see a `Save` link. A Modal will pop up when I click on the `Save` link.
    - When I'm on the Modal:
        - I would like to see a `Create new wishlist` Link and all my existing wishlist folders.
        - When I clik on the `Create new wishlist` link, I would like to see another Modal where I can create a new wishlist folder and add the listing to it.
        - When I enter more than 50 characters to name my wishlist folder:
            - I would like the website to inform me of the validations I failed to pass.

### Add to a wishlist folder

- As a logged in user, when I'm on the `/listings/:id` page, I would like to see a `Save` link. A Modal will pop up when I click on the `Save` link.
    - When I'm on the Modal:
        - I would like to see a `Create new wishlist` Link and all my existing wishlist folders.
        - I have two options to add the current listing to my wishlist:
            - I can click on the `Create new wishlist` Link to create a new wishlist folder then add the listing to the newly created wishlist folder.
            - I can select any of the existing wishlist folders and add the listing to it.








        
        


        
                





