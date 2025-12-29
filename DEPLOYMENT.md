# Deployment Guide for SafeCircle

This guide explains how to deploy the SafeCircle project to the cloud.

## Option 1: Render.com (Easiest & Free)

Render does **not** have a specific "India" region for free users (closest is Singapore), but it is the easiest way to get started.

1. **Sign up/Login** to [Render.com](https://render.com).
2. **Connect GitHub**: Link your GitHub account.
3. **Create Blueprint**:
   - Click **"New"** -> **"Blueprint"**.
   - Connect the repository `Anmol2627/ccbackend`.
4. **Configure**:
   - Enter `MONGO_URL` when prompted.
   - Region: Select **Singapore** (closest to India).
5. **Deploy**: Render handles everything.

---

## Option 2: AWS EC2 (Best for India Location + Free Tier)

If you strictly need an **India (Mumbai)** server, AWS offers a **Free Tier** for 12 months.

### Step 1: Create EC2 Instance
1.  Login to **AWS Console** and switch region to **Mumbai (ap-south-1)**.
2.  Launch Instance:
    *   **Name**: SafeCircle
    *   **OS**: Ubuntu 22.04 LTS
    *   **Instance Type**: `t2.micro` (Free Tier eligible)
    *   **Key Pair**: Create new (download the `.pem` file).
    *   **Security Group**: Allow SSH (22), HTTP (80), Custom TCP (3000), Custom TCP (8000).
3.  Launch.

### Step 2: Run Setup Script
1.  Connect to your instance via SSH:
    ```bash
    ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
    ```
2.  Run the automated setup script:
    ```bash
    # Download the script
    curl -o setup.sh https://raw.githubusercontent.com/Anmol2627/ccbackend/main/scripts/setup-vps.sh
    
    # Make it executable
    chmod +x setup.sh
    
    # Run it
    ./setup.sh
    ```
3.  Enter your `MONGO_URL` when prompted.
4.  Your app will be live at `http://<your-ec2-ip>:3000`.

---

## Option 3: DigitalOcean (Bangalore Region - Paid)

If you want an easier setup than AWS but in India:
1.  Create a **Droplet** in **Bangalore**.
2.  Select "Docker" from the Marketplace images.
3.  SSH into the server and run the same commands as Option 2.

---

## Troubleshooting

- **Backend Connection**: If the frontend says it cannot connect to the backend, check the `REACT_APP_BACKEND_URL` environment variable.
- **MongoDB Error**: Ensure your IP whitelist in MongoDB Atlas allows access from anywhere (`0.0.0.0/0`) or specifically from your server's IP.
