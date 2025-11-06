# User Management CRUD Application

A complete user management system built with Next.js 14 (App Router), PostgreSQL, Prisma ORM, React Query, and TypeScript. This application provides full CRUD (Create, Read, Update, Delete) functionality for managing users with a modern, responsive UI.

## Features

- ✅ **Complete CRUD Operations**: Create, read, update, and delete users
- 🔍 **Real-time Search**: Filter users by name, email, or phone number
- ✨ **Modern UI**: Beautiful and responsive design with Tailwind CSS
- 🎯 **Form Validation**: Client and server-side validation using Zod
- 🚀 **Optimistic Updates**: Fast UI updates with React Query
- 📝 **Type Safety**: Full TypeScript support throughout the application
- 🎨 **Modal Forms**: Intuitive modal dialogs for add/edit/delete operations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📊 **Swagger Documentation**: API endpoints documented with Swagger comments

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React Query (TanStack Query v4)** - Data fetching and state management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Server-side validation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** (v12 or higher)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-management
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```sql
CREATE DATABASE usermanagement;
```

Or use an existing database.

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/usermanagement?schema=public"
```

Replace:
- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `localhost` - Your PostgreSQL host (use `localhost` for local development)
- `5432` - Your PostgreSQL port (default is 5432)
- `usermanagement` - Your database name

### 5. Set Up Prisma

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., "init").

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

## Project Structure

```
user-management/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts           # GET (all users) & POST (create user)
│   │       └── [id]/
│   │           └── route.ts       # GET, PUT, DELETE (single user)
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Main page with user management UI
│   └── providers.tsx              # React Query provider
├── components/
│   ├── DeleteConfirmModal.tsx     # Delete confirmation modal
│   ├── SearchBar.tsx              # Search input component
│   ├── UserForm.tsx               # User form (add/edit)
│   ├── UserModal.tsx              # Reusable modal component
│   └── UserTable.tsx              # User list table
├── lib/
│   ├── hooks/
│   │   └── useUsers.ts            # React Query hooks for user operations
│   ├── validations/
│   │   └── user.ts                # Zod validation schemas
│   └── prisma.ts                  # Prisma client singleton
├── prisma/
│   └── schema.prisma              # Prisma schema definition
├── .env                           # Environment variables (not in repo)
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── next.config.js                 # Next.js configuration
├── package.json                   # Project dependencies
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## API Endpoints

All API endpoints are documented with Swagger comments in the code.

### Users Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users or search users |
| `GET` | `/api/users?search=query` | Search users by name, email, or phone |
| `POST` | `/api/users` | Create a new user |
| `GET` | `/api/users/[id]` | Get a specific user by ID |
| `PUT` | `/api/users/[id]` | Update a user by ID |
| `DELETE` | `/api/users/[id]` | Delete a user by ID |

### Request/Response Examples

#### Create User (POST `/api/users`)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

**Response (201 Created):**
```json
{
  "id": "clxy1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get All Users (GET `/api/users`)

**Response (200 OK):**
```json
[
  {
    "id": "clxy1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Update User (PUT `/api/users/[id]`)

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321"
}
```

**Response (200 OK):**
```json
{
  "id": "clxy1234567890",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

#### Delete User (DELETE `/api/users/[id]`)

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

## Validation Rules

The application uses Zod for validation on both client and server sides:

- **Name**: 
  - Minimum 2 characters
  - Maximum 100 characters
  - Required

- **Email**: 
  - Valid email format
  - Unique (no duplicates)
  - Required

- **Phone**: 
  - Minimum 10 characters
  - Maximum 15 characters
  - Required

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Features Walkthrough

### 1. View Users
- The main page displays all users in a table format
- Users are ordered by creation date (newest first)
- Loading state shows a spinner while fetching data

### 2. Search Users
- Type in the search bar to filter users
- Search works across name, email, and phone fields
- Search is debounced (300ms) for better performance
- Real-time results update as you type

### 3. Add User
- Click the "+ Add User" button
- Fill in the form with name, email, and phone
- Form validates input in real-time
- Success/error messages are displayed

### 4. Edit User
- Click "Edit" on any user row
- Modal opens with pre-filled form
- Update the information
- Changes are saved and reflected immediately

### 5. Delete User
- Click "Delete" on any user row
- Confirmation modal appears
- Confirm deletion to remove the user
- User is removed from the list

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
- Ensure PostgreSQL is running
- Check your `DATABASE_URL` in `.env`
- Verify database credentials
- Test connection: `psql -h localhost -U username -d usermanagement`

#### 2. Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
npm run prisma:generate
```

#### 3. Migration Failed

**Error:** Migration errors

**Solution:**
```bash
# Reset the database (WARNING: This will delete all data)
npx prisma migrate reset

# Or create a new migration
npx prisma migrate dev --name fix_migration
```

#### 4. Port 3000 Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill the process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## Development Tips

### Prisma Studio

Open Prisma Studio to view and edit your database:

```bash
npm run prisma:studio
```

This opens a web interface at [http://localhost:5555](http://localhost:5555)

### Hot Reload

Next.js automatically reloads when you make changes to:
- Components
- Pages
- API routes
- Styles

### TypeScript

The project uses strict TypeScript. Run type checking:

```bash
npx tsc --noEmit
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Railway
- Render
- AWS
- DigitalOcean
- Heroku

**Important:** Ensure your production database is configured and migrations are run before deployment.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 14 and modern web technologies.

