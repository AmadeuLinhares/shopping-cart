# Shopping Cart

# Operation

**Shopping cart** was built to simulate user purchases in a typical e-commerce app. It includes 4 different screens:

1.  **Products List** (Screen that displays the available products for the user to purchase)
2.  Login (Login screen)
3.  **Sign Up** (Screen for creating a new account, where the user can select their role — VIP or USER. This will affect the final discount on purchases.)
4.  **Cart** (User’s cart screen, where it’s possible to view the added products, quantities, and prices.)

## Flow

The user can navigate between the product cart and the list of available products without being logged into the application. They can add any products they want to their cart. At this stage, some validations are performed. The first is to check whether the product still has available stock. The second is an API check to see if the product already exists in the cart — if it does, we simply increase the quantity of that product.

On the product list cards, there are two buttons. The first is the cart icon: when clicked, the product is added to the cart without redirecting the user to the cart screen. The second is the **Buy** button: when clicked, the product is added to the cart and the user is redirected to the cart screen.

To view the invoice and complete the purchase, the user must be logged in. Upon logging in, we inject an HTTP-only cookie containing only the user ID, which we use to validate whether the user is authenticated. This flow was created to simulate authentication in a real system, but it was implemented in the simplest way possible for demonstration purposes only.

The list of products is preloaded into the application using a mock.

To log in, the user must create an email and password and use the same credentials to authenticate, as the password is validated. Keep in mind that everything is stored **only in memory** — meaning if the server is stopped and restarted, all cart contents and accounts will be lost. The products remain, as they are re-injected via mock.

## Backend Architecture

### Repositories

This project follows a **repository architecture** pattern. In-memory repositories were created to simulate the system’s behavior and are fully covered by unit tests to validate the business logic.

### Factories

Factories are used to compose the repositories required by each entity. Since some entities depend on multiple repositories, the factories act as a centralized place to manage this wiring. If any changes are needed—such as swapping a repository implementation—we only need to update it in one place, making the codebase easier to maintain and scale.

### Services

**Services** (also referred to as use cases) represent the core logic layer of the application. This is where business rules, validations, and core workflows are implemented. Each function defined in our repository interfaces has a corresponding service responsible for executing that specific use case, keeping the application logic well-structured and maintainable. With the application logic isolated within the services, we can reuse them with any type of data input — such as HTTP requests (as in our case), WebSocket messages, or other interfaces. This separation makes the system more modular, flexible, and easier to extend across different communication layers.

### Controller

In this application, our controllers are implemented as **Next.js API routes**. They serve as the main entry point to the application, receiving incoming requests, validating input, and delegating the execution to the appropriate services. This layer is responsible for handling communication between the external world and the internal business logic.

### SOLID Principles

- **S — Single Responsibility Principle**

  Each class or module has one clear responsibility. Services, repositories, and controllers are all separated according to their roles.

- **O — Open/Closed Principle**

  The system is open for extension but closed for modification. New features (e.g., new repository implementations) can be added without changing existing code.

- **L — Liskov Substitution Principle**

  Components can be swapped for other implementations that follow the same interface without breaking the system (e.g., switching from in-memory to Prisma repositories).

- **I — Interface Segregation Principle**

  Interfaces are specific and focused. Entities only depend on the methods they actually use.

- **D — Dependency Inversion Principle**

  High-level modules (services) depend on abstractions (interfaces), not concrete implementations (repositories). This allows for flexibility and easy testing.

## Front end

On the frontend, we use the **App Router** architecture provided by React and Next.js. For component creation, we rely on **ShadCN UI** and **Tailwind CSS** for styling. Form handling and validation are powered by **React Hook Form** and **Zod**.

For data fetching and mutations, I chose to use **React Query** together with the native **Fetch API**. While I recognize that Next.js has extended the Fetch API with built-in caching and request deduplication (such as using query keys), I find that React Query offers a more **reactive and flexible experience**, especially when dealing with features like filters, stock quantity updates, and dynamic price calculations.

## Unit tests

For unit testing, this project uses **Vitest**, a fast and lightweight testing framework fully compatible with Vite. Tests are written using **React Testing Library** to simulate real user interactions and verify the behavior of components and application logic.

We focused on testing core features such as:

- Form validation and submission

- Business logic in services (e.g., cart handling, stock validation)

- Component rendering and interaction (e.g., product list, cart, invoice)

- Integration between hooks, mutations, and API behavior

Mocks were applied for API routes, custom hooks (like useAddCart or useGetProducts), and Next.js utilities such as useRouter, enabling isolated and reliable tests. Each service and UI flow was validated independently to ensure predictable behavior across the application.

By combining **Vitest**, **React Testing Library**, and a modular architecture, we achieved a robust and maintainable testing strategy.

## Commit validation

To enforce code quality and consistency before every commit, this project uses **Husky** to run a series of automated checks via Git hooks.

#### **✅ Pre-commit hook**

    npm test             # Runs unit tests (via Vitest)
    npm run check:deps   # Checks for unused dependencies
    npm run lint         # Runs ESLint to catch code style issues
    npm run type-check   # Runs TypeScript type checking

#### **✅ Commit message hook**

    npx --no -- commitlint --edit "$1"

### RUN

**npm install**
**npm run dev**
node version: v24.0.1
Node managment tool: asdf
