# ROUTES

# GET /
renders the homepage

# GET /auth/signup
Redirects to /login page if user select “I already have a profile”
renders signup page
 
# POST /auth/signup
Body form:
Username
Email
Password
City
Dropdown menu to select Rider or Company
 
# GET /auth/login
renders the login form
Redirects to /listOfScooters when user is logged in
Redirects to /signup page if user select “I already have a profile”
 
# POST /auth/login
Body:
username
password
 
# POST /auth/logout
body: (empty)
 
# GET  /listOfScooters
Renders the page with a list of all the scooters
 
# GET  /listOfScooters/:id
Renders a page for the selected scooter including details, price, and availability status
 
# POST/rent-request/:id
After the scooter is selected and a request has been made, a pop-up message appears to confirm the booking.
 
# GET /login/rider/:id
Render the profile page of the rider with a section ‘history of requests’
 
# GET/login/company/:id
Render a company profile page with a section ‘requests to approve’
 
# GET/login/scooter/:id/create
Render a page to create a new scooter.
When successful the user is redirected to /company profile.
 
# POST/scooters/create
Render a form to create a new scooter with a body: brand, details, price.
 
# GET/login/scooter/:id/update
Render a page to update or delete an existing scooter
When successful the user is redirected to /company profile.
 
# POST/scooters/update
Render a form to update a new scooter with a body: brand, details, price.
 
# GET/feedback
Render a page to give feedback.
When successful the user is redirected to /home page.
 
# POST/feedback
Form with a text section for a feedback text field.

