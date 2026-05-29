# GitHub String Updater

A simple full-stack web application that allows users to submit a string message from a frontend interface, which is then saved to a text file and automatically pushed to a remote Git repository by the backend server.

## Architecture

The project consists of two main services running in Docker containers:
- **Frontend**: A simple HTML/CSS/JS interface served on port `3000`.
- **Backend**: A Node.js Express server running on port `5000` that handles the API request, writes the message to a file, and executes the `git` commands.

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed on your machine.
- The project directory must be a Git repository with a remote configured, and your environment must be authenticated to push to the remote.

## Getting Started

Follow these steps to run the application using Docker Compose:

1. **Start the application:**
   Navigate to the project root directory and run:
   ```bash
   docker compose up --build
   ```

2. **Access the application:**
   Open your web browser and navigate to `http://localhost:3000`.

3. **Check logs:**
   To monitor the output of the containers, run:
   ```bash
   docker compose logs
   ```

4. **Shutdown the application:**
   To safely stop and remove the containers, run:
   ```bash
   docker compose down
   ```

## Usage

1. Open the application at `http://localhost:3000`.
2. Enter a message in the text input field.
3. Click the "Update GitHub" button.
4. The backend will save the message to `backend/data/message.txt`, commit the changes, and push them to the remote Git repository.