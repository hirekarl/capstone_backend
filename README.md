# Per Scholas Software Engineering Capstone Project: Back-End

[Karl Johnson](https://github.com/hirekarl)  
2025-RTT-30  
<time datetime="2025-09-12">2025-09-12</time>  

## Overview

### URLs
- Deployed app: https://hirekarl-ps-capstone.netlify.app/
- Front-end source: https://github.com/hirekarl/capstone_frontend

### API Documentation (Version 1)

All endpoints are prefixed with `/api/v1`.

---

#### Getting Started

**Prerequisites:**

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/)

**Installation:**

1.  Clone the repository.
2.  Install the dependencies: `npm install`
3.  Create a `.env` file in the root directory and add the required environment variables, such as:
    ```bash
    PORT=3001
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<database_name>?retryWrites=true&w=majority
    CLIENT_ORIGIN=http://localhost:5173
    JWT_SECRET=<SECRET_JWT_KEY>
    ```
4.  Start the server: `npm run dev`

---

#### Packages

- [`express`](https://www.npmjs.com/package/express): For building the RESTful API.
- [`mongoose`](https://www.npmjs.com/package/mongoose): For MongoDB object data modeling.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): For user authentication and authorization.
- [`bcrypt`](https://www.npmjs.com/package/bcrypt): For secure password hashing.
- [`cors`](https://www.npmjs.com/package/cors): For handling Cross-Origin Resource Sharing.

---

#### Authentication

All endpoints, except for user registration and login, require a JSON Web Token (JWT). You must include the token in the `Authorization` header of your request in the format: `Bearer <token>`.

---

#### User Endpoints

- `POST /api/v1/users/register`

  - **Description:** Registers a new user with a unique email address.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string (email format)",
      "password": "string (minlength: 8)"
    }
    ```
  - **Response Body (Success - 201 Created):**
    ```json
    {
      "user": {
        "_id": "ObjectId",
        "username": "string",
        "email": "string (email format)"
      },
      "token": "string"
    }
    ```
  - **Error Responses:**
    - `409 Conflict`: If a user with the provided email already exists.
      ```json
      {
        "error": "HTTP 409 Conflict",
        "message": "User with this email address already exists."
      }
      ```
    - `500 Internal Server Error`: For unexpected server-side issues.
      ```json
      {
        "error": "HTTP 500 Internal Server Error",
        "message": "An unexpected server error occurred."
      }
      ```

- `POST /api/v1/users/login`

  - **Description:** Authenticates a user and returns a JSON Web Token (JWT) for subsequent authenticated requests.
  - **Request Body:**
    ```json
    {
      "email": "string (email format)",
      "password": "string"
    }
    ```
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "user": {
        "_id": "ObjectId",
        "username": "string",
        "email": "string (email format)"
      },
      "token": "string"
    }
    ```
  - **Error Responses:**
    - `401 Unauthorized`: If the email or password is incorrect.
      ```json
      {
        "error": "HTTP 401 Unauthorized",
        "message": "Incorrect email address or password."
      }
      ```
    - `500 Internal Server Error`: For unexpected server-side issues.
      ```json
      {
        "error": "HTTP 500 Internal Server Error",
        "message": "An unexpected server error occurred."
      }
      ```

---

#### Project Endpoints

**_Authentication Required_**

- `POST /api/v1/projects`

  - **Description:** Creates a new project for the authenticated user.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response Body (Success - 201 Created):**
    ```json
    {
      "_id": "ObjectId",
      "name": "string",
      "description": "string",
      "owner": "ObjectId (ref: User)"
    }
    ```
  - **Error Responses:**
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `500 Internal Server Error`: For unexpected server-side issues.

- `GET /api/v1/projects`

  - **Description:** Retrieves all projects owned by the authenticated user.
  - **Response Body (Success - 200 OK):**
    ```json
    [
      {
        "_id": "ObjectId",
        "name": "string",
        "description": "string",
        "owner": "ObjectId (ref: User)"
      }
    ]
    ```
  - **Error Responses:**
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `500 Internal Server Error`: For unexpected server-side issues.

- `GET /api/v1/projects/:projectId`

  - **Description:** Retrieves a single project by its ID, provided the authenticated user is the owner.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "ObjectId",
      "name": "string",
      "description": "string",
      "owner": "ObjectId (ref: User)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `projectId` is missing.
      ```json
      {
        "error": "HTTP 400 Bad Request",
        "message": "Missing project ID."
      }
      ```
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the project owner.
      ```json
      {
        "error": "HTTP 403 Forbidden",
        "message": "You are not authorized to view or modify this project."
      }
      ```
    - `404 Not Found`: If the project is not found.
      ```json
      {
        "error": "HTTP 404 Not Found",
        "message": "Project not found."
      }
      ```
    - `500 Internal Server Error`: For unexpected server-side issues.
      ```json
      {
        "error": "HTTP 500 Internal Server Error",
        "message": "An unexpected server error occurred."
      }
      ```

- `PATCH /api/v1/projects/:projectId`

  - **Description:** Partially updates a project by its ID. It only modifies the fields present in the request body.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "ObjectId",
      "name": "string",
      "description": "string",
      "owner": "ObjectId (ref: User)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `projectId` is missing.
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the project owner.
    - `404 Not Found`: If the project is not found.
    - `500 Internal Server Error`: For unexpected server-side issues.

- `DELETE /api/v1/projects/:projectId`

  - **Description:** Deletes a project by its ID.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "ObjectId",
      "name": "string",
      "description": "string",
      "owner": "ObjectId (ref: User)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `projectId` is missing.
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the project owner.
    - `404 Not Found`: If the project is not found.
    - `500 Internal Server Error`: For unexpected server-side issues.

---

#### Task Endpoints

**_Authentication Required_**

- `POST /api/v1/projects/:projectId/tasks`

  - **Description:** Creates a new task for a specific project.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "status": "string ('To Do' | 'In Progress' | 'Done')"
    }
    ```
  - **Response Body (Success - 201 Created):**
    ```json
    {
      "_id": "ObjectId",
      "title": "string",
      "description": "string",
      "status": "string ('To Do' | 'In Progress' | 'Done')",
      "project": "ObjectId (ref: Project)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `projectId` is missing.
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the project owner.
    - `404 Not Found`: If the project is not found.
    - `500 Internal Server Error`: For unexpected server-side issues.

- `GET /api/v1/projects/:projectId/tasks`

  - **Description:** Retrieves all tasks for a specific project.
  - **Response Body (Success - 200 OK):**
    ```json
    [
      {
        "_id": "ObjectId",
        "title": "string",
        "description": "string",
        "status": "string ('To Do' | 'In Progress' | 'Done')",
        "project": "ObjectId (ref: Project)"
      }
    ]
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `projectId` is missing.
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the project owner.
    - `404 Not Found`: If the project is not found.
    - `500 Internal Server Error`: For unexpected server-side issues.

- `GET /api/v1/projects/:projectId/tasks/:taskId`

  - **Description:** Retrieves a single task by its ID.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "ObjectId",
      "title": "string",
      "description": "string",
      "status": "string ('To Do' | 'In Progress' | 'Done')",
      "project": "ObjectId (ref: Project)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `taskId` is missing.
      ```json
      {
        "error": "HTTP 400 Bad Request",
        "message": "Missing task ID."
      }
      ```
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the task's project owner.
      ```json
      {
        "error": "HTTP 403 Forbidden",
        "message": "You are not authorized to view or modify this task."
      }
      ```
    - `404 Not Found`: If the task is not found.
      ```json
      {
        "error": "HTTP 404 Not Found",
        "message": "Task not found."
      }
      ```
    - `500 Internal Server Error`: For unexpected server-side issues.

- `PATCH /api/v1/projects/:projectId/tasks/:taskId`

  - **Description:** Partially updates a task by its ID. It only modifies the fields present in the request body.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "status": "string ('To Do' | 'In Progress' | 'Done')"
    }
    ```
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "ObjectId",
      "title": "string",
      "description": "string",
      "status": "string ('To Do' | 'In Progress' | 'Done')",
      "project": "ObjectId (ref: Project)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `taskId` is missing.
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the task's project owner.
    - `404 Not Found`: If the task is not found.
    - `500 Internal Server Error`: For unexpected server-side issues.

- `DELETE /api/v1/projects/:projectId/tasks/:taskId`

  - **Description:** Deletes a task by its ID.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "ObjectId",
      "title": "string",
      "description": "string",
      "status": "string ('To Do' | 'In Progress' | 'Done')",
      "project": "ObjectId (ref: Project)"
    }
    ```
  - **Error Responses:**
    - `400 Bad Request`: If `taskId` is missing.
    - `401 Unauthorized`: If the provided JWT is invalid, expired, or missing.
    - `403 Forbidden`: If the authenticated user is not the task's project owner.
    - `404 Not Found`: If the task is not found.
    - `500 Internal Server Error`: For unexpected server-side issues.
