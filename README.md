# GitHub String Updater (DevOps Edition)

A robust full-stack microservices application that allows users to submit a string message from a frontend interface, which is then saved to a MongoDB database, logged to a file, and automatically pushed to a remote Git repository by the backend server. 

This project serves as a comprehensive showcase for various DevOps concepts and tools, including Containerization, Microservices Orchestration, Build Automation, and CI/CD.

## Architecture

The project consists of four main services orchestrated via Docker Compose:
- **Frontend**: A simple HTML/CSS/JS interface served by an Nginx container on port `3000`.
- **Backend**: A Node.js Express server running on port `5000` that handles the API request, writes the message to a MongoDB database and local file, and executes the `git push` commands using a built-in Docker Git environment.
- **Database**: A persistent MongoDB container running on port `27017` to store submission history reliably using Docker Volumes.
- **Analytics Service**: A Java Spring Boot microservice built with Maven running on port `8080`, providing a `/stats` endpoint.

All services communicate securely over a custom Docker Bridge Network (`devops-net`).

## CI/CD Pipeline

The project features a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline using **GitHub Actions**.
Whenever code is pushed or a pull request is made to the `main` branch, the pipeline automatically:
1. Checks out the code.
2. Builds the Docker images for the Frontend, Backend, and Analytics microservices.
3. Authenticates and pushes the highly optimized images to the **GitHub Container Registry (GHCR)** using the built-in `GITHUB_TOKEN`.

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed on your machine.
- To use the GitHub push functionality, the project must be cloned as a Git repository and have a remote URL configured with a Personal Access Token.

## Getting Started

Follow these steps to run the application locally:

1. **Start the application:**
   Navigate to the project root directory and run:
   ```bash
   docker compose up --build
   ```

2. **Access the application:**
   - **Frontend UI:** Open your web browser and navigate to `http://localhost:3000`.
   - **Analytics API:** Navigate to `http://localhost:8080/stats`.

3. **Check logs:**
   To monitor the output of all containers simultaneously, run:
   ```bash
   docker compose logs -f
   ```

4. **Shutdown the application:**
   To safely stop the containers (while preserving your MongoDB data in the named volume), run:
   ```bash
   docker compose down
   ```

## Usage

1. Open the application at `http://localhost:3000`.
2. Enter a message in the text input field.
3. Click the "Update GitHub" button.
4. The Node.js backend will:
   - Save the message to the MongoDB database.
   - Save the message to `backend/data/message.txt`.
   - Commit the changes and push them dynamically to your remote Git repository!