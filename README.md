# Tenori API 🎵

A GraphQL API for managing musical settings built with Node.js, TypeScript, and Prisma.

## 🚀 Technologies

- Node.js
- TypeScript
- GraphQL (Apollo Server)
- PostgreSQL
- Prisma ORM
- Vite + Vitest

## 📋 Prerequisites

- Node.js >= 14
- PostgreSQL >= 13
- npm >= 7

## 🛠️ Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure database**

# Set up PostgreSQL database

`createdb tenori_dom_local`

# Generate Prisma client

`npx prisma generate`

# Run migrations

`npx prisma migrate dev`

# Seed database

`npm run seed`

🔒 Environment Variables
Create a .env file in the root directory:
`DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tenori_dom_local"`

👥 Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Submit a pull request
📄 License
MIT

🤝 Support
For support, email support@tenori-api.com or open an issue.
