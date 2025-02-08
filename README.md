# ParvulApps2

## Overview
ParvulApps2 is a web application designed to facilitate the grading process for primary school children in Chile. It aligns with the Chilean primary education curriculum and provides tools to evaluate students across three grading periods throughout the school year. The platform aims to simplify grading, improve data visualization for teachers, and ensure that assessments align with curriculum standards.

## Key Features
- **Curriculum Integration:** Comprehensive coverage of primary school curriculum elements in Chile.
- **Grading System:** Supports evaluations for three distinct periods during the school year.
- **Responsive Design:** Optimized for various devices, ensuring teachers can access the app on desktops, tablets, and smartphones.
- **Data Visualization:** Provides clear and interactive charts to visualize student progress.
- **User Authentication:** Secure access for teachers using Auth0 for authentication.

## Technologies Used
ParvulApps2 leverages modern web technologies and libraries for performance, security, and a seamless user experience:

### Core Technologies
- **[Next.js](https://nextjs.org/):** A React framework for server-rendered and statically generated applications.
- **[React](https://reactjs.org/):** Library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** For strong typing and better maintainability.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for styling.

### Database and ORM
- **[Drizzle ORM](https://orm.drizzle.team/):** Lightweight and type-safe ORM for managing database interactions.
- **SQLite:** Used for lightweight and efficient data storage.

### State Management and Forms
- **[React Hook Form](https://react-hook-form.com/):** Efficient form handling with built-in validation.
- **[Zod](https://zod.dev/):** Schema validation library for TypeScript.

### UI Components
- **[Radix UI](https://www.radix-ui.com/):** Accessible and customizable UI primitives.
- **[Lucide Icons](https://lucide.dev/):** Icon library for modern and clean UI.

### Authentication
- **[Auth0](https://auth0.com/):** Secure user authentication and session management.

### Data Visualization
- **[Recharts](https://recharts.org/):** Simple and customizable chart library for displaying student data.

### Carousel & Interactive UI Elements
- **[Embla Carousel](https://www.embla-carousel.com/):** Smooth and customizable carousel for presenting content.

### Task Automation and Building
- **[ESBuild](https://esbuild.github.io/):** For fast builds and efficient code compilation.
- **[Drizzle Kit](https://drizzle.team/):** Handles database schema generation and migrations.

### Developer Experience
- **[ESLint](https://eslint.org/):** Linter for code quality.
- **[Prettier](https://prettier.io/):** Code formatting.
- **[Biome](https://biome.dev/):** Code analysis and formatting.

## Project Setup
### Prerequisites
Ensure you have the following installed:
- Node.js v16 or higher
- PNPM as the package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd parvulapps2
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the required environment variables.

4. Run the development server:
   ```bash
   pnpm dev
   ```

### Building and Running
To build the application for production:
```bash
pnpm build
```
To start the production server:
```bash
pnpm start
```

## Database Management
- Seed the database:
  ```bash
  pnpm seed
  ```
- Generate schema:
  ```bash
  pnpm generate
  ```
- Apply migrations:
  ```bash
  pnpm migrate
  ```

## Contribution
Contributions are welcome! Please follow the standard pull request process.

## License
This project is licensed under the MIT License.

## Acknowledgements
Special thanks to the developers and educators who contributed to this project, ensuring its alignment with the Chilean educational curriculum and user needs.
