# IronScooter
IronScooter

Description

IronScooter is a booking platform for renting e-scooters in different cities, provided by companies. The website has two user-roles: of a rider and of an owner. The app is targeting both riders who are interested to rent a scooter and also companies that want to offer their vehicle. 

 User Stories

* 404 - As a user, I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

* 500 - As a user, I want to see a nice error page when the super team screws it up so that I know that is not my fault

* Homepage - As a user, I want to be able to access the homepage so that I see what the app is about. Also, to have a log in button to access the app as an existing user and a sign-up button to create a profile. 
 
As a company, I want to be able to create a profile and from a drop-down menu to select my user role.

* Sign up - As a user, I want to sign up on the webpage and go directly to the vehicle list so I can see all the scooters available that I could rent. 

As a company when I sign up I want to be able to add new scooters to the platform.

* Sign in - As a user, I want to be able to log in on the webpage so that I can get back to my account. On my profile page, I want to have a booking history and information about the status of my booking.

As a company when I sign in, I want to have an overview of the pending requests I need to approve.

* Logout - As a user, I want to be able to log out from the webpage so that I can make sure no one will access my account.

* List of scooters - As a user, I want to see a full list of the scooters available with photos, details and prices, and be able to filter them according to my preference for a date, time slot, and city.

* Make a request - As a user, I want to see the status of the scooter and if available to make a request to book it.

* Scooter properties - As a company, I want to create a new scooter offer, have a form to fill in all the necessary details, be able to update the scooter’s information, and delete it.

* Feedback - As a user, I want to be able to submit my feedback about my rider experience.

Backlog
* List of other features outside of the MVPs scope
 
User experience:
* As a user, I want to be able to report damages and upload a photo to visualise them
Google maps implementation
To demonstrate all the scooters available on a map 

Models

* User new Schema ({ _id: ,userName: String, required: true, maxlength: 20, email: String,unique: true, password: String, minlength: 8, maxlength: 12,  city: String, owner: String,  rider: Boolen})
   
* scooterSchema({_id, userref: user._id, product: String, maxSpeed: Number, maxRange: Number, modelYear: Number, maxLoadCapacity: Number, whichSlot: Number, required: true isAvailable: Boolean,  city: String, required: true isAvailable: String })

* RentRequest new Schema ({ _id: , scooterRef: user._id, scooterRef: scooterForRent._id, scooterRenterRef: user._id, days: Number, required: true, })




