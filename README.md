# Drivn Application

## Overview

This project is an Uber clone that replicates the basic features of Uber with some unique modifications. It provides a seamless platform where both captains (drivers) and passengers can create and manage their profiles through the same application. The application enables easy booking of rides by users and facilitates real-time communication between captains and users using WebSockets.

Key features include live tracking of both captains and users, displaying the fastest route between the pickup and destination points using the Google Maps API. The application is designed to offer a user-friendly interface and efficient ride management for both captains and passengers.

## Features

- **Unified Profile Management**: Both captains and users can create and manage their profiles within the same application.
- **Ride Booking**: Users can easily book rides with a few clicks.
- **Real-Time Communication**: WebSocket integration ensures live updates and communication between captains and users.
- **Live Tracking**: Google Maps API integration allows real-time tracking of both captains and users.
- **Optimized Routes**: Displays the fastest route between pickup and destination points.
- **Responsive Design**: Fully responsive UI for seamless usage across devices.
- **Secure Authentication**: Secure login and signup functionality for both captains and users.
- **Ride Management**: Features for requesting, accepting, and completing rides.
- **Interactive Maps**: Customizable and interactive maps for navigation and tracking.

## Technical Stack

- **Frontend**: React.js, Tailwind CSS, GSAP, Lottie Files
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: WebSocket
- **Mapping Services**: Google Maps API
- **HTTP Requests**: Axios

## Setup and Installation

1. **Clone the Repository**  
   Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/your-repo/uber-clone.git
   ```

2. **Navigate to the Project Directory**  
   Change to the project directory:

   ```bash
   cd Uber\ Application
   ```

3. **Install Dependencies**  
   Install the required dependencies for both frontend and backend:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**  
   Create a `.env` file and define the required environment variables:

   - `VITE_BASE_URL`: Base URL for the backend API.
   - `GOOGLE_MAPS_API_KEY`: API key for Google Maps services.
   - `GOOGLE_MAPS_MAP_ID`: Map ID for customizing Google Maps.

5. **Run the Application**  
   Start the development servers for both frontend and backend:

   ```bash
   npm start
   ```

6. **Access the Application**  
   Open your browser and navigate to `http://localhost:5173` to view the application.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. Suggestions for new features or improvements are always welcome.

## Future Plans

Here are some planned enhancements for the application:

- **Payment Integration**: Add support for multiple payment options, including credit/debit cards, digital wallets, and UPI.
- **Enhanced Error Handling**: Implement better error handling using toast notifications for a smoother user experience.
- **Push Notifications**: Introduce push notifications to alert users and captains about ride updates and other important events.
- **Multi-Language Support**: Add support for multiple languages to make the application accessible to a wider audience.
- **Ride History and Analytics**: Provide detailed ride history and analytics for both users and captains.
- **Rating and Feedback System**: Allow users and captains to rate each other and provide feedback after each ride.
- **Dark Mode**: Add a dark mode option for better usability during nighttime.
- **Offline Mode**: Enable limited functionality in offline mode, such as viewing ride history and profile details.

These features aim to improve the overall user experience and expand the application's functionality.
