# Capstone: Backend

[Karl Johnson](https://github.com/hirekarl)  
2025-RTT-30  
<time datetime="2025-09-12">2025-09-12</time>

![Alt text for preview image.](./preview.png)

## Overview

### API Documentation (Version 1)

All endpoints are prefixed with `/api/v1`.

---

#### User Endpoints
- `POST /api/v1/users/register`
  - **Description:** Registers a new user with a unique email address.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response Body (Success - 201 Created):**
    ```json
    {
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "token": "string"
    }
    ```

- `POST /api/v1/users/login`
  - **Description:** Authenticates a user and returns a JSON Web Token (JWT) for subsequent authenticated requests.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "token": "string"
    }
    ```

---

#### Project Endpoints
- `POST /api/v1/projects`
  - **Description:** Creates a new project for the authenticated user. Requires a valid JWT in the `Authorization` header.
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
      "_id": "string",
      "name": "string",
      "description": "string",
      "owner": "string"
    }
    ```

- `GET /api/v1/projects`
  - **Description:** Retrieves all projects owned by the authenticated user.
  - **Response Body (Success - 200 OK):**
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "owner": "string"
      }
    ]
    ```

- `GET /api/v1/projects/:projectId`
  - **Description:** Retrieves a single project by its ID, provided the authenticated user is the owner.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "owner": "string"
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
      "_id": "string",
      "name": "string",
      "description": "string",
      "owner": "string"
    }
    ```

- `DELETE /api/v1/projects/:projectId`
  - **Description:** Deletes a project by its ID.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "owner": "string"
    }
    ```

---

#### Task Endpoints
- `POST /api/v1/projects/:projectId/tasks`
  - **Description:** Creates a new task for a specific project.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "status": "string"
    }
    ```
  - **Response Body (Success - 201 Created):**
    ```json
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "project": "string"
    }
    ```

- `GET /api/v1/projects/:projectId/tasks`
  - **Description:** Retrieves all tasks for a specific project.
  - **Response Body (Success - 200 OK):**
    ```json
    [
      {
        "_id": "string",
        "title": "string",
        "description": "string",
        "status": "string",
        "project": "string"
      }
    ]
    ```

- `GET /api/v1/projects/:projectId/tasks/:taskId`
  - **Description:** Retrieves a single task by its ID.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "project": "string"
    }
    ```

- `PATCH /api/v1/projects/:projectId/tasks/:taskId`
  - **Description:** Partially updates a task by its ID. It only modifies the fields present in the request body.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "status": "string"
    }
    ```
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "project": "string"
    }
    ```

- `DELETE /api/v1/projects/:projectId/tasks/:taskId`
  - **Description:** Deletes a task by its ID.
  - **Response Body (Success - 200 OK):**
    ```json
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "project": "string"
    }
    ```
