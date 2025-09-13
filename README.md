# Chat App

A real-time chat application with rooms, built using Next.js (frontend) and Express/Socket.io (backend).

## Features
- Real-time messaging with Socket.io
- Room creation and joining
- Modern UI with Tailwind CSS
- Deployed on Vercel (frontend) and Render (backend)

## Tech Stack
- Frontend: Next.js, React, Tailwind CSS
- Backend: Express, Socket.io
- Deployment: Vercel (FE), Render (BE)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/Lavisha-S/Chat-app.git
cd Chat-app
```

#### 2. Install dependencies
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

#### 3. Start the backend server
```bash
cd server
npm run dev
# or
npm start
```

#### 4. Start the frontend
```bash
cd ../client
npm run dev
```

Frontend will run on http://localhost:3000 and backend on http://localhost:4000 by default.

## Deployment

- **Frontend:** Deploy the `client` folder to Vercel.
- **Backend:** Deploy the `server` folder to Render. Make sure to update CORS origins in `server/config/default.ts` to include your deployed frontend URLs.

## Environment Variables

- Frontend: No environment variables required for socket connection (hardcoded backend URL in `client/config/default.ts`).
- Backend: Update CORS origins in `server/config/default.ts` as needed.

## Troubleshooting
- If the frontend cannot connect to the backend, check CORS settings and make sure both are deployed over HTTPS.
- Check browser console for socket.io or network errors.

## License
MIT

## Documentation

### Project Structure

```
Chat-app/
├── client/         # Frontend (Next.js)
│   ├── app/        # Main app pages
│   ├── config/     # Frontend config (socket URL, events)
│   ├── containers/ # UI components (Rooms, Messages)
│   ├── context/    # React context for socket
│   ├── styles/     # CSS and Tailwind styles
│   └── public/     # Static assets
├── server/         # Backend (Express, Socket.io)
│   ├── src/        # Main server code
│   │   ├── app.ts  # Express app and socket.io server
│   │   ├── socket.ts # Socket.io event handlers
│   │   └── utils/  # Logger and utilities
│   └── config/     # Backend config (CORS, port)
└── README.md       # Project documentation
```

### Key Modules

- **client/config/default.ts**: Sets the backend socket URL for the frontend.
- **client/config/events.ts**: Defines socket event names for client/server communication.
- **client/context/socket.context.tsx**: Manages socket connection and context for React components.
- **client/containers/Rooms.tsx**: Handles room creation and joining via socket events.
- **server/src/app.ts**: Sets up Express server and socket.io with CORS.
- **server/src/socket.ts**: Handles socket.io events (room creation, messaging, etc).

### Socket Events

- **Client to Server**
	- `CREATE_ROOM`: Create a new chat room
	- `JOIN_ROOM`: Join an existing room
	- `SEND_ROOM_MESSAGE`: Send a message to a room
- **Server to Client**
	- `ROOMS`: List of available rooms
	- `JOINED_ROOM`: Confirmation of joining a room
	- `ROOM_MESSAGE`: New message in a room

### Extending the App

- To add new features, create new events in `client/config/events.ts` and handle them in `server/src/socket.ts`.
- Add new UI components in `client/containers/` and connect them to the socket context.

For more details, see comments in the source code or ask for specific module documentation.
