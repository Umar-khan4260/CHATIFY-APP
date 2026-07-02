# Chatify 💬

Chatify is a premium, real-time web chat application built with a modern MERN stack. It features instant message delivery, real-time presence indicators, customizable user profiles, image attachment support, robust security defenses, and automated transactional emails.

---

## 🚀 Key Features

- **⚡ Real-time Communication**: Instantly send and receive messages with **Socket.io**, keeping all users in sync.
- **🟢 Presence Indicators**: Real-time tracking of online/offline status for all chat partners.
- **🖼️ Media Sharing**: Seamless image uploads powered by **Cloudinary** integration.
- **✨ Optimistic UI Updates**: Instant message rendering on the client side with automatic rollback on network failure to ensure a zero-latency feel.
- **🛡️ Enterprise-grade Security**: Built-in protection via **Arcjet** for:
  - **Shield**: Protects against common web vulnerabilities (SQL Injection, XSS, etc.).
  - **Bot Detection**: Blocks malicious automated clients and spoofed bots.
  - **Rate Limiting**: Sliding window rate-limiting (100 requests/min) to prevent abuse and DDoS.
- **📧 Transactional Emails**: Instant, beautiful welcome emails sent to new users upon registration using **Resend**.
- **🎨 Modern Dark UI & Glassmorphism**: Stunning visual styling using **Tailwind CSS**, **DaisyUI**, animated border containers, and glowing ambient backgrounds.
- **🔊 Audio Notifications**: Customizable sound notifications for incoming messages.
- **📦 Monorepo Build Configuration**: Simple unified scripts to build, install, and run both frontend and backend.

---

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express** — HTTP Rest API Server & Routing
- **Socket.io** — Real-time event handling & Websockets
- **MongoDB** & **Mongoose** — Database and Object Data Modeling
- **Arcjet** — Bot detection, rate-limiting, and security shield
- **Cloudinary** — Image upload management
- **Resend** — Transactional email delivery
- **JSON Web Tokens (JWT)** & **Bcryptjs** — Secure cookie-based authentication

### Frontend
- **React 19** — User interface rendering
- **Vite** — Fast building and hot module replacement
- **Zustand** — Lightweight and clean global state management
- **React Router v7** — Client-side page navigation
- **Tailwind CSS** & **DaisyUI** — Utility-first CSS framework and UI components
- **Socket.io-client** — WebSocket integration
- **Axios** — HTTP client for API requests
- **React Hot Toast** — Elegant notification popups

---

## 📂 Project Structure

```text
CHATIFY-APP/
├── backend/                  # Express API Server & WebSockets
│   ├── src/
│   │   ├── controllers/      # Route controllers (Auth, Messages)
│   │   ├── emails/           # Resend email templates & handlers
│   │   ├── lib/              # Integrations (Arcjet, Cloudinary, DB, Sockets, Env)
│   │   ├── middleware/       # Security, Auth & Socket verification
│   │   ├── models/           # Mongoose Schemas (User, Message)
│   │   ├── routes/           # REST endpoints
│   │   └── server.js         # Entry point
│   ├── package.json
│   └── .env                  # Backend Configuration (Local only)
│
├── frontend/                 # Vite + React Client
│   ├── public/               # Static assets (sounds, icons)
│   ├── src/
│   │   ├── components/       # Reusable layout and UI components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Axios instance configuration
│   │   ├── pages/            # View Pages (ChatPage, LoginPage, SignUpPage)
│   │   ├── store/            # Zustand global stores (useAuthStore, useChatStore)
│   │   ├── App.jsx           # Root layout and router
│   │   └── main.jsx          # UI mount entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── package.json              # Monorepo build and start script configuration
└── README.md
```

---

## ⚙️ Configuration & Environment Variables

Create a `.env` file in the `/backend` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatify

# Authentication
SECRET_KEY=your_jwt_super_secret_key

# Frontend URI
CLIENT_URI=http://localhost:5173

# Email Notifications (Resend)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=welcome@yourdomain.com
EMAIL_FROM_NAME="Chatify Team"

# Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Security (Arcjet)
ARCJET_KEY=aj_your_arcjet_site_key
ARCJET_ENV=development
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/login` | User login and sets JWT cookie | No |
| **POST** | `/signup` | Registers new user, sends welcome email | No |
| **POST** | `/logout` | Clears user session JWT cookie | No |
| **PUT** | `/updateprofile` | Uploads and updates profile image | Yes |
| **GET** | `/check` | Verifies active session token & returns user | Yes |

### Message Routes (`/api/messages`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/contacts` | Fetch list of all registered users (except current user) | Yes |
| **GET** | `/chats` | Fetch list of users with whom you have active chats | Yes |
| **GET** | `/:id` | Fetch conversation history with a specific user | Yes |
| **POST** | `/send/:id` | Send a new message (text and/or image) | Yes |

---

## 📡 Socket.io Communication Events

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `connection` | Client ➡️ Server | Headers / Cookie | Registers active socket mapping `userId -> socketId`. |
| `getOnlineUsers`| Server ➡️ Client | `string[]` (User IDs) | Emits list of currently online user IDs to all clients. |
| `newMessage` | Server ➡️ Client | `Message` object | Delivers new real-time message to the receiver. |
| `disconnect` | Client ➡️ Server | — | Deregisters the user and updates the online users list. |

---

## 🛠️ Installation & Running Locally

### Prerequisites
- Node.js >= 20.0.0
- MongoDB Instance (Atlas or Local)
- Cloudinary, Resend, and Arcjet developer keys.

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Umar-khan4260/CHATIFY-APP.git
   cd CHATIFY-APP
   ```

2. **Install Dependencies**:
   Install all node modules in both the client and server using the monorepo utility script:
   ```bash
   npm run build
   ```

3. **Configure Environment Variables**:
   Create and fill out the `backend/.env` file as described in the **Configuration** section.

4. **Run the Application**:
   - **For Development**:
     Open two terminal sessions:
     - **Backend Dev Server**:
       ```bash
       cd backend
       npm run dev
       ```
     - **Frontend Client (Vite)**:
       ```bash
       cd frontend
       npm run dev
       ```

   - **For Production**:
     From the root folder, run:
     ```bash
     npm start
     ```
     This starts the Express server which serves the static production build of React from `/frontend/dist`.

---

## 🛡️ Security Details (Arcjet)

Chatify uses **Arcjet** to actively shield its endpoints. The backend configuration includes:
- **Shield Integration**: Inspects incoming payloads for SQL Injection, Cross-Site Scripting, and protocol manipulation.
- **Bot Defense**: Allows only verified search engine crawlers and blocks automated scraping or malicious API scripts.
- **IP Rate Limiting**: Employs a sliding-window algorithm allowing up to 100 requests per minute per IP. Exceeding this triggers a `429 Too Many Requests` response.

---

## 📄 License

Distributed under the **ISC License**. See `package.json` for details.
