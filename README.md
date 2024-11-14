# The Road to Next

The finished application that you get after completing the first journey of The Road to Next. Here you can already download it as a starter kit and start your own journey.

## Installation

1. Clone the repository
2. Add your own `.env` file with the following content [0] coming from [Supabase](https://supabase.com/)
3. Run `npm install` to install the dependencies
4. Run the database migration `npx prisma db push` to create the DB tables
5. Run the seed script `npm run seed` to seed the database
6. Run `npm run dev` to start the development server

[0]

```sh
// .env
DATABASE_URL="postgres://postgres.[project]:[password]@aws-0-[aws-region].pooler.supabase.com:6543/postgres?pgbouncer=true"

DIRECT_URL="postgres://postgres.[project]:[password]@aws-0-[aws-region].pooler.supabase.com:5432/postgres"
```
