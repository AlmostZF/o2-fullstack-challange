# Frontend

This project uses the **[Next.js](https://nextjs.org/)** framework for the frontend and **[Tailwind CSS](https://tailwindcss.com/)** for styling.

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

## **Running the Application**

### Development Mode

Inside the `/frontend` directory:

```bash
npm run dev
```

This will start the application in **development mode**. The app will be available at [http://localhost:3000](http://localhost:3000).

### Running with Docker

I chose to use Docker to containerize the application and its dependencies, which streamlines the setup process and ensures a consistent environment across different machines. By using Docker, you can run the app without worrying about installing Node.js, Tailwind CSS, or other dependencies locally, everything runs in isolated containers.

### Steps

1. Build and start the containers:

```bash
docker compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000), or the port specified in the \`docker-compose.yml\` file.

### Production Mode (without Docker)

Inside the `/frontend` directory:

```bash
npm run build
npm start
```

This will start the application in **production mode**, and the app will be available at [http://localhost:3000](http://localhost:3000).


# Architecture

This project follows a **modular architecture** approach, where the code is organized into independent, reusable parts. This structure ensures that the application is **scalable**, **maintainable**, and easy to evolve over time.

## Folder Structure

### 1. `components/`

This folder contains **reusable UI components** used across the application. These include buttons, input fields, cards, modals, and other interface elements that can be used in multiple pages or contexts.

---

### 2. `models/`

The `models` folder holds the **data definitions and schemas** used by the application. These models represent the structure of the data and are used to define types, validate formats, and interface with APIs or databases.

---

### 3. `pages/`

This folder contains the **main pages (routes)** of the application. In Next.js (using the App Router), every folder or subfolder with a `page.tsx` (or `page.jsx`) file is treated as a route. This allows for clean, organized, and scalable routing.


---

### 4. `services/`

The `services` folder contains the **business logic** of the application. It handles:
- Integration with external APIs
- Data fetching
- Authentication
- Data manipulation

Services return results or data to the components or pages, keeping logic separate from UI concerns.

---

### 5. `utils/`

This folder contains **generic utility functions** that can be reused across different parts of the application. These are independent from the business logic or UI and often include tasks like:
- Data formatting
- String/date manipulation
- Common validation functions

##  Directory Structure

The project directory is organized as follows:

- **`components/`**  
Contains reusable UI components such as buttons, inputs, cards, and modals.

- **`models/`**  
  Contains files for data definitions and structures.

- **`pages/`**  
  Contains the main page components that map to the application's routes.

- **`services/`**  
  Contains the service files for business logic and API interactions

- **`utils/`**  
  Contains utility functions and helper methods used across the application.

