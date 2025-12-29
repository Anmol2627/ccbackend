# Deployment Guide for SafeCircle

This guide explains how to deploy the SafeCircle project to the cloud.

## Option 1: Cloud Deployment (Recommended)

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

## Option 2: Docker VPS Deployment

If you have a Linux server (e.g., DigitalOcean, AWS EC2, Linode) with Docker installed:

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

- **Backend Connection**: If the frontend says it cannot connect to the backend, check the `REACT_APP_BACKEND_URL` environment variable in the Frontend service on Render. It should match your Backend Service URL.
- **MongoDB Error**: Ensure your IP whitelist in MongoDB Atlas allows access from anywhere (`0.0.0.0/0`) or specifically from Render's IPs.
