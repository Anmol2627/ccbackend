# Deployment Guide for SafeCircle

This guide explains how to deploy the SafeCircle project to the cloud.

## Option 1: Render.com (Easiest All-in-One)

We recommend using **Render.com** because it supports both our backend (Docker) and frontend (Static Site) easily.

### Prerequisites
1. **GitHub Account**: Push this code to a new GitHub repository.
2. **MongoDB Atlas Account**: Create a free database at [mongodb.com/atlas](https://www.mongodb.com/atlas).
   - Create a Cluster (Free Tier).
   - Create a Database User (username/password).
   - Network Access: Allow IP `0.0.0.0/0` (for cloud access).
   - Get your **Connection String** (e.g., `mongodb+srv://user:pass@cluster...`).

### Steps to Deploy on Render

1. **Sign up/Login** to [Render.com](https://render.com).
2. **Connect GitHub**: Link your GitHub account.
3. **Create Blueprint**:
   - Click **"New"** -> **"Blueprint"**.
   - Connect the repository you just pushed.
   - Render will automatically detect the `render.yaml` file in this project.
4. **Configure Environment**:
   - You will be prompted to enter the `MONGO_URL`. Paste your MongoDB Atlas connection string here.
   - Click **"Apply"**.
5. **Wait for Deployment**:
   - Render will build the Backend (Docker) and Frontend (Node.js).
   - Once finished, you will get two URLs: one for the backend, one for the frontend.

---

## Option 2: Vercel + Koyeb (Free Tier Alternative)

If you have issues with Render or want better performance in Asia (India), you can split the deployment:

### Frontend (Vercel)
1. **Login to [Vercel](https://vercel.com)** with GitHub.
2. **Add New Project**: Import your `ccbackend` repository.
3. **Configure Project**:
   - **Root Directory**: Click "Edit" and select `frontend`.
   - **Framework Preset**: Create React App.
   - **Environment Variables**: Add `REACT_APP_BACKEND_URL` (You will get this from the Backend step below).
4. **Deploy**: Click Deploy.

### Backend (Koyeb)
1. **Login to [Koyeb](https://koyeb.com)** with GitHub.
2. **Create App**: Select "GitHub" as the source.
3. **Repository**: Select `ccbackend`.
4. **Builder**: Docker.
5. **Docker Workdir**: Set this to `backend`.
6. **Privileged**: No.
7. **Environment Variables**:
   - Add `MONGO_URL`: Your MongoDB connection string.
   - Add `DB_NAME`: `safecircle`.
   - Add `CORS_ORIGINS`: `*` (or your Vercel URL).
8. **Deploy**.
9. **Copy URL**: Once deployed, copy the `https://...koyeb.app` URL and update your Vercel Environment Variable (`REACT_APP_BACKEND_URL`).

---

## Option 3: Docker VPS (AWS EC2 / DigitalOcean)

If you have a Linux server (e.g., AWS EC2 in Mumbai region) with Docker installed:

1. **Copy files** to your server (git clone or scp).
2. **Update Environment**:
   - Edit `docker-compose.yml` or create a `.env` file with your production values.
3. **Run**:
   ```bash
   docker compose up -d --build
   ```
4. **Access**:
   - Frontend: `http://<your-server-ip>:3000`
   - Backend: `http://<your-server-ip>:8000`

> **Note**: For production VPS, you should set up Nginx as a reverse proxy with SSL (Let's Encrypt).

## Troubleshooting

- **Backend Connection**: If the frontend says it cannot connect to the backend, check the `REACT_APP_BACKEND_URL` environment variable in the Frontend service. It should match your Backend Service URL.
- **MongoDB Error**: Ensure your IP whitelist in MongoDB Atlas allows access from anywhere (`0.0.0.0/0`) or specifically from your cloud provider's IPs.
