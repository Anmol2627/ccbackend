# Deployment Guide for SafeCircle

This guide explains how to deploy the SafeCircle project to the cloud.

## 🏆 Recommended: Hybrid Deployment (Best for India)

**Frontend** on **Vercel** (Fastest CDN in India) + **Backend** on **Render** (Easy Docker Hosting).

### Part 1: Deploy Backend on Render
1.  **Sign up/Login** to [Render.com](https://render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository (`Anmol2627/ccbackend`).
4.  **Settings**:
    *   **Name**: `safecircle-backend`
    *   **Region**: Singapore (closest to India).
    *   **Runtime**: Docker.
    *   **Root Directory**: `backend` (Important!).
    *   **Instance Type**: Free.
5.  **Environment Variables**:
    *   `MONGO_URL`: Your MongoDB Atlas connection string.
    *   `DB_NAME`: `safecircle`
    *   `CORS_ORIGINS`: `*` (or your Vercel URL later).
6.  **Deploy**.
7.  **Copy URL**: Once live, copy your backend URL (e.g., `https://safecircle-backend.onrender.com`).

### Part 2: Deploy Frontend on Vercel
1.  **Sign up/Login** to [Vercel.com](https://vercel.com).
2.  **Add New Project** -> Import `Anmol2627/ccbackend`.
3.  **Configure**:
    *   **Root Directory**: Click "Edit" -> Select `frontend`.
    *   **Environment Variables**:
        *   Key: `REACT_APP_BACKEND_URL`
        *   Value: Your Render Backend URL (from Part 1).
4.  **Deploy**.
5.  **Done!** Your app is live globally with high performance in India.

---

## Alternative: AWS EC2 (Mumbai - Free Tier)

If you strictly need an **India (Mumbai)** server for the backend, AWS offers a **Free Tier**.

### Step 1: Create EC2 Instance
1.  Login to **AWS Console** -> Region **Mumbai**.
2.  Launch **Ubuntu 22.04**, Type **t2.micro**.
3.  Security Group: Open ports 22, 80, 3000, 8000.

### Step 2: Run Setup Script
SSH into your instance and run:
```bash
curl -o setup.sh https://raw.githubusercontent.com/Anmol2627/ccbackend/main/scripts/setup-vps.sh && chmod +x setup.sh && ./setup.sh
```

---

## Troubleshooting

- **Frontend can't connect**: Check `REACT_APP_BACKEND_URL` in Vercel settings. It must allow HTTPS (e.g. `https://your-render-app.onrender.com`).
- **MongoDB Error**: Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access.
