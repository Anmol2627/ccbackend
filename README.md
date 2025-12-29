# SafeCircle

This project is a full-stack application with a React frontend and a FastAPI backend.

## Project Structure

- `frontend/`: React application (using Tailwind CSS, Shadcn UI).
- `backend/`: FastAPI application (using MongoDB).

## Prerequisites

- Docker and Docker Compose
- Node.js (for local frontend dev)
- Python 3.11+ (for local backend dev)

## Running with Docker (Recommended)

To build and start the entire application (frontend, backend, database):

```bash
docker-compose up --build
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **MongoDB**: localhost:27017

## Running Locally

### Backend

1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn server:app --reload
   ```
   Note: You need a running MongoDB instance locally or update `.env` to point to one.

### Frontend

1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

The project includes Dockerfiles for both frontend and backend, making it ready for deployment on any container platform (Docker Swarm, Kubernetes, ECS, etc.).

- `frontend/Dockerfile`: Multi-stage build (Node build -> Nginx serve).
- `backend/Dockerfile`: Python FastAPI image.
