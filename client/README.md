# Client-Side Documentation for Referral Management System

This is the client-side application of the Referral Management System. The project is built using **React** and **Material-UI (MUI)**, providing a modern user interface and seamless integration with the backend API.

---

## Features

1. **User Registration**: Users can register with their details, including optional referral codes.
2. **User Login**: Secure authentication for existing users.
3. **Referral Tracking**: Displays referred users in a tabular format with essential details.
4. **Wallet and Earnings**: Integration to fetch and display user wallet and earnings data.
5. **Material-UI Design**: Clean and responsive UI components for an enhanced user experience.

---

### Prerequisites

- Node.js (v14 or higher recommended)
- Backend API server for handling requests

---

## Project Setup

## Configuration for Referral URL and API Endpoint

Before running the application, ensure you update the following configurations to match your setup:

1. **Referral URL**:

   - Navigate to the file `src/screens/ReferAndEarn.jsx`.
   - Update the referral URL with your actual client host or use `localhost` if running locally.

2. **API Endpoint**:
   - Go to `src/features/endpointSlice.js`.
   - Update the API endpoint with your backend server URL to enable proper communication between the frontend and the backend.

These changes are essential to ensure that the referral system works seamlessly with the correct URLs for your environment.

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kaushalrathour/Zollege-Refer-App

   ```

2. Change directory to client
   ```bash
   cd client
   ```
3. Install the dependencies

   ```bash
   npm install
   ```

4. Run the app
   ```bash
   npm run dev
   ```
