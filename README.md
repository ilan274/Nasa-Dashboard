# NASA Dashboard Take-Home Challenge

This is a project for the NASA Dashboard Take-Home Challenge. The goal is to create a dashboard that displays a list of the closest objects to Earth for any given date using the NASA API.

---

## Tasks Checklist

### Task 1: Build the Foundation ✅

**Frontend (React + TypeScript)**

- [x] **Framework**: React (with TypeScript).
- [x] **Goal**: Display a list of NASA objects.

**Backend (Express)**

- [x] **Framework**: Fastify (or your preferred server framework).
- [x] **Goal**: Consume NASA APIs and process data for the frontend.

**Bonus Points**
- [x] Add linting and formatting tools (e.g., ESLint, Prettier).
- [ ] Document your setup choices and reasoning.
- [x] Include any developer experience improvements (e.g., scripts, environment setup).
  - [x] Environment setup using `.env` and `dotenv`:
  - `NASA_API_KEY`, `NASA_API_URL`, `PORT`
  - Added MUI for the frontend

---

### Task 2: Build the Feature ✅

- [x] Implement a date picker to select a specific date
- [x] Display for each object:
  - [x] Name
  - [x] Size
  - [x] Closeness to Earth
  - [x] Relative Velocity
- [x] Allow sorting by:
  - [x] Size
  - [x] Closeness to Earth
  - [x] Relative Velocity
- [x] Provide a valid **OpenAPI 3 schema** for your API.
- [x] Bonus
  - [x] Add caching to improve performance.
  - [ ] Document your approach and any trade-offs.

---

## What I would do if I had more time
- Backend:
  - Better TS typing
  - Add Zod validation
  - Add unit tests
  - I used NodeCache for caching, but I would use Redis for a production environment
- Frontend:
  - Better TS typing
  - Add Zod validation
  - Better error handling
  - Better UI
  - Add unit tests

## Running the Project

### Make sure you are using a recent version of Node such as 20.x.x

### Backend
```bash
cd backend
yarn install
yarn dev
```

### Frontend
```bash
cd frontend
yarn install
yarn dev
```