# Memory Game

This is a simple memory game built with React and TypeScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

## Running

To run the development server, follow these steps:

1. Install the dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start
```

The application will start running on [http://localhost:3000](http://localhost:3000).

## Building

To build the project, run the following command:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Testing

This project uses Playwright for end-to-end testing.

Ensure Playwright and its necessary dependencies have been set up with:

```bash
npm run test:install-deps
```

To run the tests, use the following command:

```bash
npm run test:e2e
```

## Linting

To lint the project, use the following command:

```bash
npm run lint
```

## Deploying

This project deploys to GitHub Pages using GitHub Actions. To deploy the project, push to the `master` branch. Details of the deployment can be found in `.github/workflows`. Pipeline status can be viewed [here](https://github.com/Dacrol/memory-game/actions).
