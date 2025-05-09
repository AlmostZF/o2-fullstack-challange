# Backend

This project uses the **[Express](https://expressjs.com/)** framework for the backend, **[Prisma](https://www.prisma.io/)** as the ORM for database interactions, and **[Docker](https://www.docker.com/)** to containerize the application and its dependencies.


## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (includes \`npm\`)
- [Docker](https://www.docker.com/)

## Cloning the Project

```bash
git clone <repository-url>
cd <repository-directory>
```

## Installing Dependencies

```bash
npm install
```

## Setting Up Environment Variables

Copy the example `.env` file:

```bash
cp backend/.env.example backend/.env
```

## **Running the Application**

### Development Mode
Inside the `/backend` directory:

```bash
npm run dev
```


### Running with Docker

I choose to use Docker to containerize the application and its dependencies, which streamlines the setup process and ensures a consistent environment across different machines. By using Docker, you can run the app without worrying about installing Node.js, databases, or other dependencies locally, everything runs in isolated containers.
### Steps

1. Build and start the containers:

```bash
docker compose up --build
```

The application will be available at [http://localhost:5001](http://localhost:5001), or the port specified in the \`docker-compose.yml\` file.
`
### Production Mode (without Docker)

Inside the `/backend` directory:

```bash
npm run build
npm start
```

The application will be available at: [http://localhost:5001](http://localhost:5001) (or the port defined in your \`.env\` file)


### **Port Conflict Warning**

If you're facing issues running the application due to a port conflict (port 3306 is already in use), follow these steps:

#### 1. **Change the Port in the \`docker-compose.yml\`**:

If port 3306 is already being used by another process, you can change the external port to something like 3307, 3308, etc., in your `docker-compose.yml` file:

```yaml
db:
  image: mysql:8.3
  ports:
    - "3307:3306"  # Change the external port to 3307 or another available port
```

#### 3. **Rebuild and Restart the Containers**:

After making these changes, rebuild the containers to apply the configuration changes:

```bash
docker-compose down
docker-compose up --build
```

Now, the application should work without issues, even if port 3306 is in use on your system!



## **Architecture Documentation**

This API was built using the **Express.js** framework and follows an architecture based on **modern MVC**, with **strong separation of concerns**, aiming for modularity, scalability, and ease of maintenance.

## Folder Structure

### 1. **`controller/`**: 
Contains the **controller** files responsible for handling HTTP requests, validating data, and returning responses to the client.

### 2. **`service/`**: 
Contains the **service** files where the business logic of the application resides.

### 3. **`models/`**: 
Contains the **model** files, typically related to database interactions.

### 4. **`routes/`**: 
Contains the **route** files that define the API endpoints and associate them with controllers.

### 5. **`shared/`**: 
Contains **middlewares** and **utilities** used across the application.

### 6. **`server.ts`**: 
The main file that **initializes the Express application**.



##  Components and Responsibilities

### 1. **Controller (Presentation Layer)**

- **Responsibility:** Receives and handles HTTP requests. Validates input data (or delegates to middlewares).
- Forwards the logic to the **service** layer and returns the response to the client.

---

### 2. **Service (Application / Business Layer)**

- **Responsibility:** Contains the business logic.
- Processes data received from **controllers**, interacts with repositories, databases, or external services, and centralizes the domain logic.

---

### 3. **DTOs (Data Transfer Objects)**

- **Responsibility:** Defines the structure of data flowing between layers (input and output).
- **Goal:** Ensures data consistency and simplifies validation and data mapping.

---

### 4. **Routes**

- **Responsibility:** Defines the application's endpoints and maps URLs to controllers.
- Applies middlewares and sets the routing rules for each endpoint.

---

### 5. **Middlewares**

- **Responsibility:** Functions that intercept HTTP requests before they reach the controller.
  - Data validation
  - Authentication and authorization
  - Logging
  - Error handling

---

### 6. **Utils**

- **Responsibility:** Utility functions that can be reused across the application.
  - **Goal:** Simplify repetitive tasks, such as date formatting, token generation, conversions, etc.


## Standards and Best Practices

The architecture follows the **modern MVC** pattern with the following best practices:

- **Clear separation of concerns** between controllers, services, and models.
- Use of **DTOs** to define and validate input and output data.
- **Dependency injection** instead of tight coupling between classes, providing more flexibility and testability.
- Usage of **middlewares** for handling authentication, validation, and errors, ensuring a more robust request flow.
- **Utility functions** to avoid repeated code and facilitate maintenance.



## Benefits of the Architecture

- **Scalability:** The modular structure allows new functionalities to be added without compromising the rest of the system.
- **Testability:** The layers are separated in a way that makes it easier to perform unit tests for each component.
- **Easier maintenance:** The separation of concerns and the use of DTOs make maintenance and troubleshooting easier.
- **Code reuse:** Centralizing common logic in middlewares and utilities promotes code reuse and prevents duplication.
