# Drivn Application - Backend API Documentation

## Overview

This backend is designed to support a ride-hailing application, providing functionalities for user and captain management, ride creation, fare calculation, and map-based services. It is built using modern web technologies and follows a modular architecture for scalability and maintainability.

### Technical Tools Used

1. **Node.js**: Runtime environment for building the backend.
2. **Express.js**: Web framework for handling HTTP requests and routing.
3. **MongoDB**: NoSQL database for storing user, captain, and ride data.
4. **Mongoose**: ODM library for MongoDB to define schemas and interact with the database.
5. **Socket.IO**: Real-time communication for ride updates and notifications.
6. **JWT (jsonwebtoken)**: For generating and verifying authentication tokens.
7. **Bcrypt**: For hashing and comparing passwords securely.
8. **Axios**: For making HTTP requests to external APIs (e.g., Google Maps API).
9. **Google Maps API**: For geocoding, distance calculation, and location suggestions.
10. **Express-Validator**: Middleware for validating and sanitizing user input.
11. **Cookie-Parser**: For parsing cookies in HTTP requests.
12. **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
13. **Dotenv**: For managing environment variables securely.

## How to Run the Backend

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system.
2. **MongoDB**: Make sure MongoDB is installed and running locally or provide a remote MongoDB connection URL.

### Steps to Run

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the `Backend` folder and add the following variables:

   ```properties
   MONGO_URL=mongodb://127.0.0.1:27017/uber
   PORT=3000
   JWT_SECRET=your_jwt_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   FRONTEND_BASE_URL=your_frontend_base_url
   ```

   - **MONGO_URL**: MongoDB connection string.
   - **PORT**: Port number for the backend server.
   - **JWT_SECRET**: Secret key for signing JWT tokens.
   - **GOOGLE_MAPS_API_KEY**: API key for Google Maps services.
   - **FRONTEND_BASE_URL**: URL of the frontend application for CORS configuration.

4. Start the server:

   ```bash
   npm start
   ```

5. Access the backend:
   The backend will be running at `http://localhost:<PORT>` (default: `http://localhost:3000`).

## Models

This section describes the models used in the backend:

1. **Captain Model**: Stores information about captains, their vehicles, and location.

   - **Structure**:  
     The `captainModel` contains the following fields:

     - `fullname`: An object with `firstname` (required, minLength: 3) and `lastname` (minLength: 3).
     - `email`: A unique and required string with a minimum length of 5 characters.
     - `password`: A required string for storing hashed passwords.
     - `socketId`: A string to store the captain's socket connection ID.
     - `status`: A string with possible values `['Active', 'InActive']` (default: `InActive`).
     - `vehicle`: An object with the following fields:
       - `color`: A required string with a minimum length of 3 characters.
       - `vehicleNumber`: A required string with a minimum length of 3 characters.
       - `capacity`: A required number with a minimum value of 1.
       - `vehicleType`: A required string with possible values `['car', 'bike', 'auto']`.
     - `location`: An object with:
       - `type`: A string (default: `Point`).
       - `coordinates`: An array of numbers `[longitude, latitude]` (default: `[78.9629, 20.5937]`).

   - **Functions**:
     - `hashPassword`: A static method to hash a plain text password using bcrypt before saving it to the database.
     - `comparePassword`: An instance method to compare a plain text password with the hashed password stored in the database.

2. **User Model**: Stores information about users of the application.

   - **Structure**:  
     The `userModel` contains the following fields:

     - `fullname`: An object with `firstname` (required, minLength: 3) and `lastname` (minLength: 3).
     - `email`: A unique and required string with a minimum length of 5 characters.
     - `password`: A required string for storing hashed passwords.
     - `socketId`: A string to store the user's socket connection ID.

   - **Functions**:
     - `hashPassword`: A static method to hash a plain text password using bcrypt before saving it to the database.
     - `comparePassword`: An instance method to compare a plain text password with the hashed password stored in the database.

3. **Ride Model**: Stores information about rides, including user, captain, and ride details.

   - **Structure**:  
     The `rideModel` contains the following fields:

     - `user`: A reference to the `user` model (required).
     - `captain`: A reference to the `captain` model.
     - `pickup`: A required string representing the pickup location.
     - `destination`: A required string representing the destination location.
     - `vehicleType`: A required string representing the type of vehicle.
     - `distance`: A string representing the distance of the ride.
     - `duration`: A string representing the duration of the ride.
     - `fare`: A string representing the fare of the ride.
     - `otp`: A required string (not selected by default) used for ride verification.
     - `status`: A string with possible values `['pending', 'accepted', 'ongoing', 'completed', 'cancelled']` (default: `pending`).
     - `paymentId`: A string representing the payment ID.
     - `orderId`: A string representing the order ID.
     - `signature`: A string representing the payment signature.

4. **Token Blacklist Model**: Stores blacklisted tokens to prevent unauthorized access.

   - **Structure**:  
     The `tokenBlacklist` model contains the following fields:

     - `token`: A required and unique string representing the blacklisted token.
     - `createdAt`: A date field that defaults to the current date and time. It is set to expire automatically after 24 hours (86400 seconds).

## Endpoints

This section lists the endpoints available in the backend:

1. **Captain Endpoints**
2. **User Endpoints**
3. **Ride Endpoints**
4. **Map Endpoints**

### Captain Endpoints

1. **POST /captains**  
   **Description:** Registers a new captain.  
   **Validations (Express Validators):**

   - `fullname.firstname`: Must not be empty and must have at least 3 characters.
   - `email`: Must not be empty and must be a valid email.
   - `password`: Must not be empty and must have at least 8 characters.
   - `vehicle.color`: Must not be empty and must have at least 3 characters.
   - `vehicle.vehicleNumber`: Must not be empty and must have at least 3 characters.
   - `vehicle.capacity`: Must not be empty and must be an integer of at least 1.
   - `vehicle.vehicleType`: Must not be empty and must be one of `['car', 'bike', 'auto']`.  
     **Request Format:**

   ```json
   {
     "fullname": {
       "firstname": "John",
       "lastname": "Doe"
     },
     "email": "john.doe@example.com",
     "password": "password123",
     "vehicle": {
       "color": "Red",
       "vehicleNumber": "ABC123",
       "capacity": 4,
       "vehicleType": "car"
     }
   }
   ```

   **Response Format:**

   - **201 Created:**
     ```json
     {
       "created": "captain created successfully!",
       "token": "JWT_TOKEN",
       "captain": { ...captain details... }
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleCaptainSignup` in `captainController.js`.  
     **Route:** Defined in `routes/captain.js`.

2. **POST /captains/login**  
   **Description:** Logs in an existing captain.  
   **Validations (Express Validators):**

   - `email`: Must not be empty and must be a valid email.
   - `password`: Must not be empty and must have at least 8 characters.  
     **Request Format:**

   ```json
   {
     "email": "john.doe@example.com",
     "password": "password123"
   }
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "message": "captain logged in successfully!",
       "token": "JWT_TOKEN",
       "captain": { ...captain details... }
     }
     ```
   - **401 Unauthorized:** Invalid email or password.  
     **Handler:** `handleCaptainLogin` in `captainController.js`.  
     **Route:** Defined in `routes/captain.js`.

3. **GET /captains/profile**  
   **Description:** Retrieves the profile of the authenticated captain.  
   **Authentication Middleware:** `checkCaptainAuthentication` in `middlewares/captainAuth.js`.  
   **Headers:**

   - `Authorization: Bearer JWT_TOKEN`  
     **Response Format:**
   - **200 OK:**
     ```json
     {
       "captain": { ...captain details... }
     }
     ```
   - **401 Unauthorized:** Invalid or missing token.  
     **Handler:** `getCaptainProfile` in `captainController.js`.  
     **Route:** Defined in `routes/captain.js`.

4. **GET /captains/logout**  
   **Description:** Logs out the captain by blacklisting the token.  
   **Authentication Middleware:** `checkCaptainAuthentication` in `middlewares/captainAuth.js`.  
   **Headers:**
   - `Authorization: Bearer JWT_TOKEN`  
     **Response Format:**
   - **200 OK:**
     ```json
     {
       "message": "captain logged out successfully!"
     }
     ```
     **Handler:** `handleCaptainLogout` in `captainController.js`.  
     **Route:** Defined in `routes/captain.js`.

**Services Used:**

- **JWT Service (`jwt.js`)**:
  - Used to generate (`setToken`) and verify (`getToken`) JWT tokens for authentication.
  - Example: `setToken` is used in `handleCaptainSignup` and `handleCaptainLogin` to generate tokens for captains.

### User Endpoints

1. **POST /users**  
   **Description:** Registers a new user.  
   **Validations (Express Validators):**

   - `fullname.firstname`: Must not be empty and must have at least 3 characters.
   - `email`: Must not be empty and must be a valid email.
   - `password`: Must not be empty and must have at least 8 characters.  
     **Request Format:**

   ```json
   {
     "fullname": {
       "firstname": "John",
       "lastname": "Doe"
     },
     "email": "john.doe@example.com",
     "password": "password123"
   }
   ```

   **Response Format:**

   - **201 Created:**
     ```json
     {
       "created": "user created successfully!",
       "user": { ...user details... },
       "token": "JWT_TOKEN"
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleUserSignUp` in `userController.js`.  
     **Route:** Defined in `routes/user.js`.

2. **POST /users/login**  
   **Description:** Logs in an existing user.  
   **Validations (Express Validators):**

   - `email`: Must not be empty and must be a valid email.
   - `password`: Must not be empty and must have at least 8 characters.  
     **Request Format:**

   ```json
   {
     "email": "john.doe@example.com",
     "password": "password123"
   }
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "message": "User logged in successfully!",
       "token": "JWT_TOKEN",
       "user": { ...user details... }
     }
     ```
   - **401 Unauthorized:** Invalid email or password.  
     **Handler:** `handleUserLogin` in `userController.js`.  
     **Route:** Defined in `routes/user.js`.

3. **GET /users/profile**  
   **Description:** Retrieves the profile of the authenticated user.  
   **Authentication Middleware:** `checkForAuthentication` in `middlewares/userAuth.js`.  
   **Headers:**

   - `Authorization: Bearer JWT_TOKEN`  
     **Response Format:**
   - **200 OK:**
     ```json
     {
       "user": { ...user details... }
     }
     ```
   - **401 Unauthorized:** Invalid or missing token.  
     **Handler:** `getUserProfile` in `userController.js`.  
     **Route:** Defined in `routes/user.js`.

4. **GET /users/logout**  
   **Description:** Logs out the user by blacklisting the token.  
   **Authentication Middleware:** `checkForAuthentication` in `middlewares/userAuth.js`.  
   **Headers:**
   - `Authorization: Bearer JWT_TOKEN`  
     **Response Format:**
   - **200 OK:**
     ```json
     {
       "message": "User logged out successfully!"
     }
     ```
     **Handler:** `handleLogout` in `userController.js`.  
     **Route:** Defined in `routes/user.js`.

**Services Used:**

- **JWT Service (`jwt.js`)**:
  - Used to generate (`setToken`) and verify (`getToken`) JWT tokens for authentication.
  - Example: `setToken` is used in `handleUserSignUp` and `handleUserLogin` to generate tokens for users.

### Ride Endpoints

1. **POST /rides/create**  
   **Description:** Creates a new ride request.  
   **Validations (Express Validators):**

   - `pickup`: Must not be empty and must have at least 3 characters.
   - `destination`: Must not be empty and must have at least 3 characters.
   - `vehicleType`: Must not be empty and must be one of `['car', 'bike', 'auto']`.  
     **Request Format:**

   ```json
   {
     "pickup": "Location A",
     "destination": "Location B",
     "vehicleType": "car"
   }
   ```

   **Response Format:**

   - **201 Created:**
     ```json
     {
       "user": { ...user details... },
       "pickup": "Location A",
       "destination": "Location B",
       "vehicleType": "car",
       "fare": 100,
       "otp": ""
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleRideCreate` in `rideControllers.js`.  
     **Route:** Defined in `routes/rideRoutes.js`.

2. **GET /rides/fare**  
   **Description:** Calculates the fare for a ride based on pickup and destination.  
   **Validations (Express Validators):**

   - `initial`: Must not be empty and must have at least 3 characters.
   - `final`: Must not be empty and must have at least 3 characters.  
     **Request Format (Query Parameters):**

   ```
   ?initial=LocationA&final=LocationB
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "fare": {
         "auto": 50,
         "car": 100,
         "bike": 30
       }
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleRideFare` in `rideControllers.js`.  
     **Route:** Defined in `routes/rideRoutes.js`.

3. **POST /rides/confirm-popup**  
   **Description:** Confirms a ride and assigns a captain.  
   **Validations (Express Validators):**

   - `captainId`: Must be a valid MongoDB ObjectId.
   - `rideId`: Must be a valid MongoDB ObjectId.  
     **Request Format:**

   ```json
   {
     "captainId": "CAPTAIN_ID",
     "rideId": "RIDE_ID"
   }
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "msg": "ride confirmed and driver found",
       "ride": { ...ride details... }
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleConfirmPopup` in `rideControllers.js`.  
     **Route:** Defined in `routes/rideRoutes.js`.

4. **POST /rides/verify-otp**  
   **Description:** Verifies the OTP for a ride.  
   **Validations (Express Validators):**

   - `otp`: Must be a 4-digit number.  
     **Request Format:**

   ```json
   {
     "otp": "1234",
     "ride": { ...ride details... }
   }
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "msg": "otp matched",
       "ride": { ...ride details... }
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleVerifyOtp` in `rideControllers.js`.  
     **Route:** Defined in `routes/rideRoutes.js`.

5. **POST /rides/complete-ride**  
   **Description:** Marks a ride as completed.  
   **Validations (Express Validators):**
   - `ride`: Must not be empty.  
     **Request Format:**
   ```json
   {
     "ride": { ...ride details... }
   }
   ```
   **Response Format:**
   - **200 OK:**
     ```json
     {
       "msg": "ride was successful"
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleCompleteRide` in `rideControllers.js`.  
     **Route:** Defined in `routes/rideRoutes.js`.

**Services Used:**

- **Ride Services (`rideServices.js`)**:
  - `getFare`: Calculates the fare for a ride based on distance and duration.
  - `generateOTP`: Generates a 4-digit OTP for ride verification.
  - Example: `getFare` is used in `handleRideCreate` and `handleRideFare` to calculate ride fares, and `generateOTP` is used in `handleRideCreate` to generate OTPs for rides.
- **Map Services (`map.js`)**:
  - `getDistanceAndTime`: Calculates the distance and time between two locations.
  - `findCaptainsNearby`: Finds captains near a specific location.
  - Example: `getDistanceAndTime` is used in `handleRideCreate` to calculate ride details, and `findCaptainsNearby` is used to locate captains near the pickup location.

### Map Endpoints

1. **GET /maps/get-coordinates**  
   **Description:** Retrieves the geographical coordinates (latitude and longitude) for a given address.  
   **Validations (Express Validators):**

   - `address`: Must not be empty and must have at least 3 characters.  
     **Request Format (Query Parameters):**

   ```
   ?address=Some Address
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "lat": 37.7749,
       "lng": -122.4194
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleGetCoordinates` in `mapControllers.js`.  
     **Route:** Defined in `routes/mapRoutes.js`.

2. **GET /maps/get-distance-time**  
   **Description:** Calculates the distance and estimated travel time between two addresses.  
   **Validations (Express Validators):**

   - `initial`: Must not be empty and must have at least 3 characters.
   - `final`: Must not be empty and must have at least 3 characters.  
     **Request Format (Query Parameters):**

   ```
   ?initial=AddressA&final=AddressB
   ```

   **Response Format:**

   - **200 OK:**
     ```json
     {
       "distance": 12.5, // in kilometers
       "time": 25.3 // in minutes
     }
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleGetDistanceTime` in `mapControllers.js`.  
     **Route:** Defined in `routes/mapRoutes.js`.

3. **GET /maps/get-suggestions**  
   **Description:** Provides autocomplete suggestions for a given input string.  
   **Validations (Express Validators):**
   - `input`: Must not be empty and must have at least 1 character.  
     **Request Format (Query Parameters):**
   ```
   ?input=Some Input
   ```
   **Response Format:**
   - **200 OK:**
     ```json
     [
       {
         "name": "Main Street",
         "address": "San Francisco, CA"
       },
       {
         "name": "Market Street",
         "address": "San Francisco, CA"
       }
     ]
     ```
   - **400 Bad Request:** Validation errors.  
     **Handler:** `handleGetSuggestions` in `mapControllers.js`.  
     **Route:** Defined in `routes/mapRoutes.js`.

**Services Used:**

- **Map Services (`map.js`)**:
  - `getCoordinates`: Retrieves geographical coordinates for a given address.
  - `getDistanceAndTime`: Calculates the distance and time between two locations.
  - `getSuggestions`: Provides autocomplete suggestions for location inputs.
  - Example: `getCoordinates` is used in `handleGetCoordinates`, `getDistanceAndTime` is used in `handleGetDistanceTime`, and `getSuggestions` is used in `handleGetSuggestions` to handle map-related functionalities.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests.
