# CareerPathPro

**A comprehensive career guidance platform designed for Sri Lankan students to discover career paths, find educational opportunities, and make informed decisions about their future.**

CareerPathPro combines intelligent career recommendation algorithms with real-time access to universities, scholarships, courses, and vocational training programs in Sri Lanka. It helps students navigate their career journey by matching their academic profile, interests, and stream with suitable career paths and educational resources.

## Stack

- **Language(s):** TypeScript (82%), HTML (15.7%), CSS (1.3%), JavaScript (1%)
- **Framework / runtime:** Node.js + Express backend, React 18 with Vite frontend
- **Notable libraries:** 
  - React Query for state management
  - Drizzle ORM for database layer
  - Zod for schema validation
  - Radix UI components with Tailwind CSS
  - TensorFlow.js for ML-based recommendations
  - Puppeteer & Cheerio for web scraping
  - Passport for authentication

## How it's organized

```
client/                    React frontend SPA
  src/
    pages/                 Page components (HomePage, CareerPathsPage, ResourcesPage, etc.)
    components/            Reusable UI components
    lib/                   Utilities (queryClient, etc.)
    hooks/                 Custom React hooks
    types/                 TypeScript type definitions
    data/                  Static or processed data
    index.css              Global styles
    i18n.ts                Internationalization setup

server/                    Express backend API
  index.ts                 Server entry point with logging middleware
  routes.ts                API endpoint definitions
  storage.ts               In-memory data storage with career recommendation logic
  educational-data.ts      Default educational data
  scraper.ts               Web scraping service for real-time data
  types.ts                 Backend type definitions
  vite.ts                  Vite development server setup

shared/
  schema.ts                Shared Zod schemas & database models (Drizzle ORM)

Configuration files:
  package.json             Dependencies and scripts
  tsconfig.json            TypeScript configuration
  tailwind.config.ts       Tailwind CSS customization
  drizzle.config.ts        Database migration configuration
  vite.config.ts           Frontend build configuration
  vite.config.server.ts    Server build configuration
```

**How it fits together:**

The application runs as a full-stack monolith on a single port (5000). The Express server handles API requests at `/api/*` endpoints and serves the compiled React frontend. On startup, the server registers all routes, initializes in-memory data storage with default career paths and educational resources, then sets up Vite for development or serves static files in production. The React client communicates with the backend via axios and React Query, displays career recommendations based on user input (stream, subjects, grades, interests), and provides real-time search for universities, scholarships, courses, and vocational training programs via web scraping.

## How to run it

### Development
```bash
npm install
npm run dev
```
Server will start on `http://localhost:5000`

### Build
```bash
npm run build
```
Compiles the React frontend and bundles the Node.js backend.

### Production
```bash
npm run start
```
Runs the built application from the `dist` directory.

### Database
```bash
npm run db:push
```
Pushes schema changes to the database (requires Drizzle Kit).

### Type checking
```bash
npm run check
```
Runs TypeScript compiler without generating output.

**Environment Variables:**
- `NODE_ENV`: Set to `development` or `production`
- `PORT`: Server port (defaults to 5000)
- `HOST`: Bind address (defaults to 0.0.0.0)

## Key Features

- **Career Recommendation Engine**: Intelligent matching based on academic stream, subjects, grades, and interests
- **Educational Resources Database**: Curated list of Sri Lankan universities, scholarships, vocational training, and online courses
- **Real-Time Search**: Scrapes DuckDuckGo for current university programs, scholarships, courses, and vocational training
- **Responsive UI**: Built with Radix UI, Tailwind CSS, and Framer Motion animations
- **Multi-language Support**: i18next integration for internationalization
- **Dark Mode Support**: Theme switching with next-themes
- **Type-Safe**: Full TypeScript throughout frontend and backend

## Core API Endpoints

### Career Recommendations
- `POST /api/career-recommendations` - Get career recommendations based on student profile
- `GET /api/career-paths` - List all available career paths
- `GET /api/career-paths/:id` - Get details for a specific career path

### Educational Resources
- `GET /api/educational-resources` - List all resources (optionally filtered by type)
- `GET /api/educational-resources/:id` - Get details for a specific resource
- `GET /api/universities?q=<query>` - Search universities in real-time
- `GET /api/university-search?subjects=<comma-separated>` - Find universities by subjects
- `GET /api/scholarships?q=<query>` - Search scholarships in real-time
- `GET /api/courses?q=<query>` - Search online courses in real-time
- `GET /api/training?q=<query>` - Search vocational training programs in real-time

### Career Listing (Web Scraper)
- `GET /api/careers` - Get paginated list of careers with search support
- `GET /api/careers/:id` - Get details for a specific career

## Try asking

- How does the career recommendation algorithm work and what factors does it consider?
- What's the structure of the career input schema and how are student profiles validated?
- How does the web scraper extract and filter Sri Lankan educational resources?
