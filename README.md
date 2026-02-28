# 🚨 AERG — AI Emergency Response Grid

> Real-time AI-powered emergency ambulance dispatch system with live tracking, smart routing, and automated accident detection.

---

## 🚀 Live Deployment Guide

As requested, here is the guide to making the whole project live on the web using **GitHub**, **Vercel** (Frontend), and **Render** (Backend).

### 1. Pushing to GitHub (Completed)
I have successfully pushed the restored project code to your repository:
`https://github.com/codewithowais7/ai-emergency-response-grid.git`

---

### 2. Backend Deployment (Render.com)
1.  Go to [Render.com](https://render.com) and sign up with GitHub.
2.  Click **New +** → **Web Service**.
3.  Connect the `ai-emergency-response-grid` repository.
4.  Set the following:
    -   **Name**: `aerg-backend`
    -   **Root Directory**: `backend`
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install`
    -   **Start Command**: `npm start`
    -   **Plan**: `Free`
5.  Add **Environment Variables**:
    -   `NODE_ENV` = `production`
    -   `CORS_ORIGIN` = `*` (Change to your Vercel URL after deployment)

---

### 3. Frontend Deployment (Vercel.com)
1.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
2.  Click **Add New** → **Project**.
3.  Import the `ai-emergency-response-grid` repository.
4.  Set the following:
    -   **Project Name**: `aerg-frontend`
    -   **Framework Preset**: `Vite`
    -   **Root Directory**: `frontend`
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
5.  Add **Environment Variables**:
    -   `VITE_API_BASE_URL` = `https://aerg-backend.onrender.com` (Use your actual Render URL here)
6.  Click **Deploy**.

---

### 4. AI Service Deployment (Optional)
The AI service (Python) can be deployed as a **Background Worker** on Render or Railway.
-   **Root Directory**: `ai-service`
-   **Build Command**: `pip install -r requirements.txt`
-   **Start Command**: `python main.py`
-   **Env Variable**: `AERG_BACKEND_URL` = `https://aerg-backend.onrender.com/api/emergencies`

---

## 📐 System Architecture
-   **Frontend**: React 18 + Leaflet + Vite
-   **Backend**: Node.js + Express + Socket.io
-   **AI**: Python + YOLOv8 Simulation
-   **Communication**: REST & WebSockets

---

## 📄 License
MIT
