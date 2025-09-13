# Capstone: Backend

[Karl Johnson](https://github.com/hirekarl)  
2025-RTT-30  
<time datetime="2025-09-12">2025-09-12</time>

![Alt text for preview image.](./preview.png)

## Overview

### API Documentation (Version 1)

All endpoints are prefixed with `/api/v1`.

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
    ```json
    {
      "error": "HTTP 401 Unauthorized",
      "message": "Incorrect email address or password."
    }
    ```

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
