#!/bin/bash

# SafeCircle VPS Setup Script (Ubuntu/Debian)
# Use this script to set up your AWS EC2 (Mumbai) or DigitalOcean (Bangalore) server.

set -e

echo "🚀 Starting SafeCircle Setup..."

# 1. Install Docker and Git
echo "📦 Installing Docker and Git..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git

# Add Docker's official GPG key:
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install Docker packages
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 2. Clone Repository
echo "📂 Cloning Repository..."
if [ -d "ccbackend" ]; then
    echo "   Repo exists, pulling latest changes..."
    cd ccbackend
    git pull
else
    git clone https://github.com/Anmol2627/ccbackend.git
    cd ccbackend
fi

# 3. Setup Environment Variables
echo "⚙️  Configuring Environment..."
if [ ! -f .env ]; then
    echo "   Creating .env file..."
    read -p "Enter your MONGO_URL (from Atlas): " MONGO_URL
    
    cat <<EOF > .env
MONGO_URL=$MONGO_URL
DB_NAME=safecircle
CORS_ORIGINS=*
REACT_APP_BACKEND_URL=http://$(curl -s ifconfig.me):8000
EOF
else
    echo "   .env file already exists. Skipping..."
fi

# 4. Start Application
echo "🚀 Launching Application..."
sudo docker compose up -d --build

echo "✅ Deployment Complete!"
echo "   Frontend: http://$(curl -s ifconfig.me):3000"
echo "   Backend:  http://$(curl -s ifconfig.me):8000"
