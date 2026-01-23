# Skill Screen

A real-time collaborative coding interview platform built with React, Express, MongoDB, and Stream.io for video calls.

## 🚀 Features

- **Real-time Video Calls** - HD video and audio communication using Stream.io
- **Live Code Editor** - Collaborative coding with Monaco Editor
- **Multi-language Support** - JavaScript, Python, Java
- **Problem Library** - Curated coding problems for interviews
- **Session Management** - Create and join coding sessions
- **Authentication** - Secure authentication with Clerk

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Clerk account (for authentication)
- Stream.io account (for video calls)
- Inngest account (for background jobs)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sharad7s7/Skill-Screen.git
cd Skill-Screen
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables Setup

#### Backend Environment Variables (`backend/.env`)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
NODE_ENV=development

# Inngest Configuration
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Stream.io Configuration
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Clerk Configuration
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment Variables (`frontend/.env`)

Create a `.env` file in the `frontend` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/
VITE_STREAM_API_KEY=your_stream_api_key
```

### 4. Run the Application

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on **http://localhost:5000**

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on **http://localhost:5173**

## 🌐 Ports Configuration

- **Frontend (Vite)**: Port `5173` (default Vite port)
- **Backend (Express)**: Port `5000` (configured in `backend/.env`)

### CORS Configuration

The backend is configured to accept requests from the frontend URL specified in `CLIENT_URL`. In development, this is `http://localhost:5173`. The backend uses `credentials: true` to allow cookies/authentication headers.

## 🚢 Deployment on Render

### Backend Deployment

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `skill-screen-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend`
   - **Start Command**: `npm run start --prefix backend`
   - **Root Directory**: Leave empty (root of repo)

4. **Set Environment Variables** in Render Dashboard:

   Go to your service → **Environment** tab → Add the following variables:

   ```
   PORT=10000
   DB_URL=your_mongodb_connection_string
   NODE_ENV=production
   
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

   **Important Notes:**
   - `PORT` should be `10000` (Render's default) or use `$PORT` environment variable
   - `CLIENT_URL` should be your **frontend deployment URL** (if deploying separately) or your backend URL if serving frontend from backend
   - `NODE_ENV` must be `production` for the app to serve the built frontend

### Frontend Deployment (Optional - if deploying separately)

If you want to deploy frontend separately:

1. **Create a new Static Site** on Render
2. **Connect your GitHub repository**
3. **Configure:**
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. **Set Environment Variables** in Render Dashboard:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=https://your-backend-url.onrender.com/
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

   **Important:** After setting environment variables, you need to **trigger a new deploy** for the changes to take effect.

### Recommended: Single Deployment (Backend serves Frontend)

Since your backend is configured to serve the frontend in production, you can deploy just the backend:

1. Follow the **Backend Deployment** steps above
2. Make sure `CLIENT_URL` matches your backend URL: `https://your-backend-service.onrender.com`
3. The backend will automatically serve the built frontend from `/frontend/dist`

## 📝 Environment Variables Reference

### Backend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (use `10000` or `$PORT` on Render) | Yes |
| `DB_URL` | MongoDB connection string | Yes |
| `NODE_ENV` | Environment (`development` or `production`) | Yes |
| `CLIENT_URL` | Frontend URL for CORS (must match frontend URL) | Yes |
| `INNGEST_EVENT_KEY` | Inngest event key | Yes |
| `INNGEST_SIGNING_KEY` | Inngest signing key | Yes |
| `STREAM_API_KEY` | Stream.io API key | Yes |
| `STREAM_API_SECRET` | Stream.io API secret | Yes |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |

### Frontend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `VITE_API_URL` | Backend API URL (must end with `/`) | Yes |
| `VITE_STREAM_API_KEY` | Stream.io API key | Yes |

## 🔧 How CORS and Axios Work

### CORS (Cross-Origin Resource Sharing)

- **Backend** (`backend/src/server.js`): Configured to accept requests from `CLIENT_URL` with `credentials: true`
- **Frontend** (`frontend/src/lib/axios.js`): Uses `withCredentials: true` to send cookies/auth headers
- **Important**: The `CLIENT_URL` in backend must exactly match your frontend URL (including protocol and port)

### Axios Configuration

- All API requests use the `baseURL` from `VITE_API_URL`
- Cookies are automatically sent with every request (`withCredentials: true`)
- In development: `http://localhost:5000/`
- In production: `https://your-backend-url.onrender.com/`

## 🐛 Troubleshooting

### Build Fails on Render

- **Issue**: `daisyui` not found
  - **Solution**: Ensure `daisyui` is in `dependencies` (not `devDependencies`) in `frontend/package.json`

### CORS Errors

- **Issue**: Requests blocked by CORS
  - **Solution**: Verify `CLIENT_URL` in backend matches your frontend URL exactly (including `https://` and no trailing slash)

### Environment Variables Not Working

- **Issue**: Variables not loading in frontend
  - **Solution**: 
    - Frontend variables must start with `VITE_`
    - After changing variables in Render, trigger a new deploy
    - Check that variables are set in the correct service (backend vs frontend)

### Port Issues

- **Issue**: Server won't start
  - **Solution**: Use `$PORT` or `10000` on Render. Render automatically sets `PORT` environment variable

## 📚 Project Structure

```
Skill-Screen/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── lib/           # Utilities (db, env, stream)
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── server.js      # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities (axios, stream)
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # Entry point
│   └── package.json
└── package.json           # Root package.json
```

## 📄 License

ISC

## 👤 Author

[Your Name]

## 🔗 Links

- [GitHub Repository](https://github.com/sharad7s7/Skill-Screen)
- [Issues](https://github.com/sharad7s7/Skill-Screen/issues)
