# Task Management API

## Overview
The **Task Management API** is a RESTful API built using **NestJS** to manage tasks. It provides functionalities to create, retrieve, update, and delete tasks. This API also includes additional enhancements such as health checks, improved validation, and Swagger documentation for easy integration.

## Features
- **Create a Task:** Add a new task with a description and status.
- **Retrieve All Tasks:** Fetch all tasks with optional query filtering by status.
- **Update a Task:** Modify a task's status (e.g., mark as completed or active).
- **Delete a Task:** Remove a task from the database.
- **Health Check Endpoint:** Check the API's health status and retrieve the server's IP address.
- **Swagger API Documentation:** Auto-generated documentation for easy API exploration.

## Enhancements
- **Status Enum Validation:** Ensures that a task's status can only be `pending`, `completed`, or `active`.
- **DTO (Data Transfer Object) Implementation:** Uses DTOs for request validation and data integrity.
- **Middleware for Logging:** Basic request logging for debugging and monitoring.
- **Improved Error Handling:** Returns structured error responses for invalid inputs.

## Technologies Used
- **NestJS**
- **Swagger (OpenAPI)**
- **Class-validator & Class-transformer**
- **MikroORM**
- **Node.js**
- **MySQL**

## Installation
### Prerequisites
- **Node.js** (>= 16.x)
- **npm** or **yarn** installed
- **MySQL**

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/CollinDex/task-management-api.git
   cd task-management-api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure your database connection and other settings just as done in the .env.example file
   ```env
   NODE_ENV=development
   PORT=3000
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=password
   DB_NAME=task
   DB_ENTITIES=dist/src/modules/**/entities/**/*.entity{.ts,.js}
   DB_MIGRATIONS=dist/db/migrations/*{.ts,.js}
   DB_SSL=false
   ```
4. **Run database migrations:**
   ```bash
   npm run migration:run
   ```
5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## API Endpoints
### Task Endpoints
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| `POST` | `/api/v1/tasks` | Create a new task |
| `GET`  | `/api/v1/tasks` | Retrieve all tasks (with optional status filtering) |
| `PATCH`| `/api/v1/tasks/:id` | Update a task's status |
| `DELETE`| `/api/v1/tasks/:id` | Delete a task |

### Health Check Endpoint
| Method | Endpoint  | Description |
|--------|----------|-------------|
| `GET`  | `/health` | Check API health status |

## Running Tests
To run unit tests:
```bash
npm run test
```
To run end-to-end (E2E) tests:
```bash
npm run test:e2e
```

## Swagger API Documentation
Swagger documentation is available at:
```
http://localhost:3000/api/docs
```
It provides an interactive UI for testing API endpoints.

## Assumptions
- The task status can only be `pending`, `completed`, or `active`.
- All endpoints follow RESTful conventions.
- The API follows a modular structure with controllers, services, and DTOs.