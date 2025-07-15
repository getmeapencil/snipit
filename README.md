# Snipit

Snipit is a full-stack web application for creating, storing, and sharing code snippets. It features a rich text editor for notes and a dedicated code editor with syntax highlighting.

## Features

- User authentication with Google OAuth
- Create, view, edit, and delete snippets
- Rich text editor for notes and descriptions
- Code editor with syntax highlighting for numerous languages
- Shareable links for snippets

## Showcase

<img width="1863" height="1012" alt="image" src="https://github.com/user-attachments/assets/0834830e-5c75-438e-8768-ce25b03a4d27" />
<img width="1863" height="1012" alt="image" src="https://github.com/user-attachments/assets/e7b77098-8496-4f58-9bb0-e87b51e3eb90" />
<img width="1863" height="1012" alt="image" src="https://github.com/user-attachments/assets/9a47e088-b03d-40b8-966a-cc0531407af8" />
<img width="1863" height="1012" alt="image" src="https://github.com/user-attachments/assets/595969fc-9f54-40d8-be13-94b9b749da8a" />
<img width="1863" height="1012" alt="image" src="https://github.com/user-attachments/assets/e7be4aac-0c0b-4869-8f8c-17661036dac3" />


## Tech Stack

**Client:** React, Vite, Mantine, Zustand, Monaco Editor, TipTap Rich Text Editor

**Server:** Node.js, Express, MongoDB, Mongoose, Passport.js for authentication

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (make sure you have a running instance)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/getmeapencil/snipit.git
    cd snipit
    ```
2.  Install server dependencies
    ```sh
    cd server
    npm install
    ```
3.  Install client dependencies
    ```sh
    cd ../client
    npm install
    ```

## Environment Variables

This project uses environment variables to configure the application. You will need to create `.env` files for both the client and the server.

### Server

Create a `.env` file in the `server` directory (`server/.env`) and add the following variables.

```env
# Server and Client Configuration
PORT=3000
NODE_ENV=development
BACKEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/snipit

# Google OAuth Configuration
# Obtain these from the Google API Console
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# JWT and Session Secrets
# Use strong, unique secrets for production
JWT_SECRET=a_very_secure_jwt_secret
SESSION_SECRET=a_very_secure_session_secret
```

### Client

Create a `.env` file in the `client` directory (`client/.env`) and add the following variables.

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:3000/api
```

## Usage

To run the application, you'll need to start both the server and the client in separate terminal windows.

1.  **Start the server**

    Navigate to the `server` directory and run:

    ```sh
    cd server
    npm run dev
    ```

    The server will start on `http://localhost:3000`.

2.  **Start the client**

    Navigate to the `client` directory and run:

    ```sh
    cd client
    npm run dev
    ```

    The client development server will start, typically on `http://localhost:5173`.

Now you can open your browser and navigate to `http://localhost:5173` to use the application.

## License

Distributed under the ISC License.
