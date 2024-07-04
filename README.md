# Holidaze

<img src="https://i.ibb.co/gDtT7XP/holidaze-Pic.png" alt="holidaze-Pic" border="0" width="100%">
<a href="https://ibb.co/WpD8ZWM"><img src="https://i.ibb.co/WpD8ZWM/holidaze-Pic2.png" alt="venues" border="0"></a>
<a href="https://ibb.co/0KhQkb2"><img src="https://i.ibb.co/0KhQkb2/holidaze-Pic3.png" alt="venue" border="0"></a>
<a href="https://ibb.co/0tk9Zmr"><img src="https://i.ibb.co/0tk9Zmr/holidaze-Pic4.png" alt="profile" border="0"></a>
<a href="https://ibb.co/hCPrVm9"><img src="https://i.ibb.co/hCPrVm9/holidaze-Pic5.png" alt="create" border="0"></a>

<br/>
<br/>

Holidaze is a comprehensive web application that simplifies the process of finding, booking, and managing venues for various events and occasions. Users can browse through a list of available venues, search for specific venues based on their preferences, and view detailed information about each venue's amenities, pricing, and availability calendar. Registered customers with a valid stud.noroff.no email can create bookings for their desired venues and manage their upcoming and past bookings seamlessly. Additionally, Holidaze allows users with a stud.noroff.no email to register as venue managers, enabling them to create, update, and delete their own venue listings, as well as view and manage bookings for their managed venues. The application offers a user-friendly interface for both customers and venue managers, providing features such as user authentication, avatar updates, and logout functionality, ensuring a secure and personalized experience.

## Features

- **User Authentication**: Users can create an account, log in, and manage their profile information.
- **Venue Listing**: Browse a list of available venues with details such as location, amenities, and pricing.
- **Venue Search**: Search for venues based on different criteria like location, capacity, and amenities.
- **Venue Booking**: Authenticated users can book available venues for specific dates and times.
- **Booking Management**: Users can view and manage their upcoming and past bookings.
- **Venue Management** (for venue managers): Authenticated venue managers can add, update, and remove their venue listings.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast and modern build tool for web applications.
- **React Router**: A routing library for handling navigation in React applications.
- **React Bootstrap**: A popular UI library for React based on Bootstrap.
- **Font Awesome**: A library for adding icons and fonts to the application.

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/queenen/holidaze.git
   ```

2. Navigate to the project directory:

   ```
   cd holidaze
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

   This will start the Vite development server and open the application in your default browser.

5. To build the production bundle, run:

   ```
   npm run build
   ```

   This will create an optimized production build in the `dist` folder.

6. To run the production build locally, use:

   ```
   npm run serve
   ```

   This will start a local server serving the production build.

## Project Structure

- `src/`: Contains the source code for the React application.
- - `asset/`: Location of media and font files.
  - `components/`: Reusable React components.
  - `context/`: Contains React Context providers and related files for state management.
  - `hooks/`: Custom React hooks used throughout the application.
  - `layout/`: Layout components that define the overall structure and UI elements shared across multiple pages.
  - `pages/`: Top-level pages for different routes.
  - `services/`: Helper functions and API calls.
  - `utils/`: Utility functions.
  - `App.jsx`: The main entry point of the application.
  - `AppRouter.jsx`: The main router component responsible for handling client-side routing within the application.
  - `index.jsx`: The entry point for the Vite build process.
- `public/`: Contains the HTML entry point and other static assets.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Font Awesome](https://fontawesome.com/)
- [ChatGPT](https://chatgpt.com/)
- [Claude](https://claude.ai/)
