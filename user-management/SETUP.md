# Quick Setup Guide

This guide will help you set up the User Management application quickly on Windows.

## Prerequisites Check

1. **Node.js Installation**
   ```powershell
   node --version
   # Should show v18.0.0 or higher
   ```

2. **PostgreSQL Installation**
   ```powershell
   psql --version
   # Should show PostgreSQL 12 or higher
   ```

## Step-by-Step Setup

### Step 1: Install Dependencies

```powershell
npm install
```

### Step 2: Create Database

Open PostgreSQL command line (psql) or pgAdmin and run:

```sql
CREATE DATABASE usermanagement;
```

### Step 3: Configure Environment

Copy the example environment file:

```powershell
Copy-Item .env.example .env
```

Edit `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/usermanagement?schema=public"
```

**Common PostgreSQL Default Credentials:**
- Username: `postgres`
- Password: (the one you set during installation)
- Host: `localhost`
- Port: `5432`

### Step 4: Set Up Database Schema

```powershell
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate
```

When prompted for migration name, enter: `init`

### Step 5: Start Development Server

```powershell
npm run dev
```

Your application should now be running at: http://localhost:3000

## Troubleshooting Windows Specific Issues

### PowerShell Execution Policy Error

If you see an error like "running scripts is disabled on this system", run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Or for a single session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### PostgreSQL Connection Issues

1. **Check if PostgreSQL is running:**
   - Open Services (Win + R, type `services.msc`)
   - Look for "postgresql" service
   - Ensure it's running

2. **Test database connection:**
   ```powershell
   psql -U postgres -d usermanagement
   ```

3. **If connection fails:**
   - Check `pg_hba.conf` file
   - Ensure `localhost` connections are allowed
   - Restart PostgreSQL service

### Port 3000 Already in Use

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

## Quick Commands Reference

| Task | Command |
|------|---------|
| Install packages | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Start production | `npm start` |
| Generate Prisma Client | `npm run prisma:generate` |
| Run migrations | `npm run prisma:migrate` |
| Open database GUI | `npm run prisma:studio` |
| Check types | `npx tsc --noEmit` |
| Lint code | `npm run lint` |

## Verification Steps

After setup, verify everything is working:

1. ✅ Open http://localhost:3000
2. ✅ Click "+ Add User"
3. ✅ Create a test user
4. ✅ Edit the user
5. ✅ Search for the user
6. ✅ Delete the user

If all steps work, your setup is complete! 🎉

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Ensure all prerequisites are installed
- Verify your `.env` file is configured correctly
- Check that PostgreSQL service is running

