# AccessKart

AccessKart is a frontend-only accessibility-focused e-commerce marketplace built with React, Vite, TypeScript, and Fluent UI. It supports assistive-product browsing, purchasing, rentals, comparison, localStorage persistence, simulated checkout, and accessibility preferences.

## Prerequisites

- Node.js 20 or newer
- npm

Check the installed versions:

```bash
node --version
npm --version
```

## Run locally

1. Clone or copy the project:

```bash
git clone <repository-url>
cd accesskart
```

2. Install dependencies:

```bash
npm install
```

3. Start the Vite development server:

```bash
npm run dev
```

4. Open the URL printed in the terminal. It is normally:

```text
http://localhost:5173/
```

The server automatically restarts when source files change.

## Run on another device over the local network

Start Vite with a network-accessible host:

```bash
npm run dev -- --host 0.0.0.0
```

Find the development computer's IPv4 address:

### Windows

```powershell
ipconfig
```

### macOS or Linux

```bash
ip addr
# or
ifconfig
```

Then open this URL on another device connected to the same network:

```text
http://<development-computer-ip>:5173/
```

The terminal may assign a different port, such as `5174`, if `5173` is already in use. Use the URL printed by Vite.

## Build for production

Create an optimized build:

```bash
npm run build
```

The generated files are written to `dist/`. They can be deployed to a static web host.

To preview the production build locally:

```bash
npx vite preview
```

Open the preview URL printed in the terminal, normally `http://localhost:4173/`.

## Run tests

```bash
npm test
```

The test suite uses Vitest and Testing Library.

## Project structure

```text
src/
  components/  # Reusable UI components
  context/     # Store and accessibility state
  data/        # Mock catalog data
  hooks/       # Reusable React hooks
  pages/       # Application routes and screens
  test/        # Vitest and Testing Library tests
```

## Persistence

AccessKart is frontend-only. Cart, wishlist, comparison, orders, profile, and accessibility preferences are stored in browser `localStorage`. No backend or Azure services are required.
