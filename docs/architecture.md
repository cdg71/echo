# Architecture

## Summary

- **Presentation Layer:** Uses HTMX pages and components to manage the user interface, keeping it free from business logic.
- **Domain Layer:** Implements business logic using Elysia’s routing and guarding tools, acting as the intermediary between the UI and data layers.
- **Data Layer:** Manages data validation and storage through Elysia Schemas, Bun SQLite, and Bun fs, ensuring data operations are isolated from business logic.

This architecture adheres to the principles of clean architecture by maintaining a clear separation of concerns, ensuring that business logic is independent from the UI and data layers. This separation enhances the maintainability, testability, and scalability of the application.

For small to medium-sized projects, the HEX-Bun stack provides a good balance of simplicity, scalability, and performance. For larger projects, while the stack can still be effective, it is important to:

- **Plan for Scalability**: Use modular architecture and consider microservices or other scalable patterns.
- **Optimize Performance**: Regularly profile and optimize the application to handle increased load and complexity.
- **Leverage Additional Tools**: Integrate additional tools for monitoring, logging, and performance management as needed.

---

## Presentation Layer

**Components:** HTMX pages and components  
**Responsibilities:**

- Manages the user interface and presentation logic.
- Contains no business logic.
- Only includes minimal code necessary to handle UI behavior.

**Explanation:** This layer corresponds to the outermost layer in clean architecture. Its primary role is to deliver data to the user and receive user input without involving any business logic. This separation ensures that changes in the UI do not affect the core business logic.

## Domain Layer

**Components:** Elysia main tools (routes, guards, etc.)  
**Responsibilities:**

- Serves as the bridge between the presentation and data layers.
- Contains all the business logic and application-specific rules.
- Uses components and models to define and execute use cases.

**Explanation:** This layer represents the core of the application’s business rules and logic. By isolating the business logic here, we ensure that it remains independent of technical implementations. This layer orchestrates the flow of data and operations, ensuring the application's core processes are managed effectively.

## Data Layer

**Components:** Elysia Schemas and validators, Bun SQLite, Bun fs  
**Responsibilities:**

- Manages data validation and persistent storage.
- Defines DAOs (Data Access Objects) and DTOs (Data Transfer Objects).
- Interfaces with the database and file system to manage data storage.

**Explanation:** This layer handles all data access and persistence operations. It abstracts the database and file system interactions, ensuring that these operations do not interfere with the business logic. By defining clear models and validation schemas, this layer ensures data integrity and consistency.

## Folder Structure

```
data/
  ├─ assets/                # Static assets generated during production (images, documents)
  ├─ database.sqlite        # Main database
src/
  ├─ components/            # Reusable UI components (appshell, htmltemplate)
  ├─ config/                # Configuration files, middleware, plugins...
  │  └─ database.ts         # Database initialization and setup
  ├─ entities/
  │  ├─ entityName/
  │  │  ├─ schema.ts        # Definition of the entity, in SQL for the database and as an Elysia Schema
  │  │  ├─ schema.sql       # Definition of the entity, in SQL for the database and as an Elysia Schema
  │  │  └─ dao.ts           # Shared functions that interact with the actual storage (database, filesystem, ...)
  ├─ services/
  │  ├─ serviceName/
  │  │  ├─ components/      # Service-specific UI components
  │  │  ├─ crons/           # Elysia crons related to the service
  │  │  ├─ routes/          # Elysia routes related to the service
  │  │  ├─ scripts/         # Client scripts related to the service
  │  │  ├─ dto/             # DTOs related to the service
  │  │  ├─ dao/             # Functions related to the service that interact with the actual storage (database, filesystem, ...)
  │  │  └─ index.tsx        # Service entry point (Elysia plugin)
  ├─ static/                # Static files served by Elysia static plugin
  ├─ styles/                # Global CSS
  ├─ tests/                 # Tests
  ├─ utils/                 # Database init function, Elysia plugins, and other utility functions
  ├─ db.ts                  # Database initialization and setup
  └─ index.tsx              # Main entry point
```

This folder structure supports the clean architecture principles by organizing code into layers and responsibilities, making it easier to manage, extend, and maintain the application.
