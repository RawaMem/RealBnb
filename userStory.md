# User Stories

## Users

### Sign Up

- As a registered and unauthorized user, I would like to find a Sign up button by clicking on a profile logo on the navigation bar. I should then see a drop down modal of choices where the Sign up button is located at. 
- I want to be redirected to `api/users/signup` after clicking the Sign up button.
- I want to be able to sign up for the website via the sign-up form.

    - When I'm on the `api/users/signup` page:

        - I would like to be able to enter my email, first name, last name and preferred password on a clearly laid out form.
        - I would like the website to log me in upon successful completion of the sign-up form.
            - So that I can seamlessly access the site's functionality.    
    - When I enter invalid data on the sigh-up form:

        - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries(except my password).
            - So I can try again without having to refill forms that I had entered valid data into.

### Log in

- As a registered and unauthorized user, I would like to find a Log in button by clicking on a profile logo on the navigation bar. I should then see a drop down modal of choices where the Log in button is located at. 
- I want to be redirected to `api/users/login` after clicking the Log in button.
- I want to be able to log in to the website via the log-in form.

    - When I'm on the `api/users/login` page:

        - I would like to be able to enter my email and password on a clearly laid out form.
        - I would like the website to log me in to all listings page `api/listings` upon successful completion of the log-in form.
            - So that I can seamlessly review all listed rooms and access the site's functionality.
    - When I enter invalid data on the log-in form:

        - I would like the website to inform me of the validations I failed to pass.
            - So I can try again based on the error messages received from previous attempt.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `api/users/signup` and `api/users/login` pages to allow me to visit the site as a guest without signing up or logging in.

    - When I'm on either the `api/users/signup` or `api/users/login`:
    
        - I can click on a `Continue as Guest` button to log me in and allow me certain accesses as a normal user.
            - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to be able to click on my profile logo on the navigation bar and see a drop down Modal of choices, where I can find a `Log out` button that will let me log out of the website.

    - While on any page of the site:
        - I can log out of my account via the same log out button located at the same place and remain on the same page.
            - So that I won't lose access to the page I was reviewing before I logged out.



