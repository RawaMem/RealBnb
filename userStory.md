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
        - I have access to a Save your listing button that will confirm my new listing.

        
        


        
                





