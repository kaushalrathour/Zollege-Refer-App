# Server-Side Documentation for Referral Management System

This is the server-side application for the Referral Management System. The backend is built using **Node.js** and **Express** and communicates with a MongoDB database. The server handles user authentication, referral data, wallet information, and earnings.

---

## Features

1. **User Registration**: Registers new users with referral codes and stores data in MongoDB.
2. **User Authentication**: Secure login and authentication for registered users.
3. **Referral Tracking**: Tracks and manages the referred users and their status.
4. **Wallet and Earnings**: Manages wallet data and earnings for users.
5. **MongoDB Integration**: Connects to a MongoDB Atlas cluster for data storage.

---

## Project Setup

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- MongoDB account (for Atlas cloud or local MongoDB setup)
- `.env` file for storing environment variables

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kaushalrathour/Zollege-Refer-App
   ```

2. Change directory to client
   ```bash
   cd server
   ```
3. Install the dependencies

   ```bash
   npm install
   ```

4. Run the app
   ```bash
   node app.js
   ```

### Key Points:

- Instructions for setting up the `.env` file are included.
- Environment variables like `PORT`, `SECRET`, and `MONGO_URL` are specified for configuring the server.
- Basic setup and commands for running the server are given.
