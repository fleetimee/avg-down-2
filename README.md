# FleeDCA - Cryptocurrency Investment Tracker

FleeDCA is a modern web application for tracking and managing cryptocurrency investments, with a focus on dollar-cost averaging (DCA) strategies.

## Features

- **Investment Buckets**: Organize your crypto investments by coin-specific buckets
- **Transaction Tracking**: Record and monitor all your buy/sell transactions
- **DCA Analysis**: Track the performance of your dollar-cost averaging strategy
- **Real-time Market Data**: Get up-to-date pricing and market information through integration with CoinGecko API
- **Portfolio Overview**: View your total investment, current value, and profit/loss metrics
- **User Authentication**: Secure login with email, GitHub, or Google authentication

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Shadcn UI, Radix UI, Tailwind CSS
- **Authentication**: BetterAuth
- **Data Fetching**: React Query / TanStack Query
- **Database**: PostgreSQL (with SQL migrations)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- PostgreSQL database

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/avg-down-2.git
cd avg-down-2
```

2. Install dependencies

```bash
npm install
# or
bun install
```

3. Set up your environment variables by creating a `.env.local` file:

```
DATABASE_URL=your-postgres-connection-string
AUTH_SECRET=your-auth-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Run the database migrations

```bash
npx better-auth migrate
```

5. Start the development server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # Shared UI components
├── features/         # Feature-based modules
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and libraries
└── providers/        # React context providers
```

## Deployment

The application is configured for deployment on [Vercel](https://vercel.com). Simply connect your GitHub repository to Vercel for automatic deployments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
