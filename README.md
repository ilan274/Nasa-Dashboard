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
- [] Document your setup choices and reasoning.
- [x] Include any developer experience improvements (e.g., scripts, environment setup).
  - [x] Environment setup using `.env` and `dotenv`:
  - `NASA_API_KEY`, `NASA_API_URL`, `PORT`

---

### Task 2: Build the Feature ❌

- [ ] Implement a date picker to select a specific date
- [ ] Display for each object:
  - [ ] Name
  - [ ] Size
  - [ ] Closeness to Earth
  - [ ] Relative Velocity
- [ ] Allow sorting by:
  - [ ] Size
  - [ ] Closeness to Earth
  - [ ] Relative Velocity
- [ ] Bonus
  - [ ] Add caching to improve performance.
  - [ ] Document your approach and any trade-offs.

---

## Running the Project

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