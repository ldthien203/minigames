import pg from 'pg'

const pool = new pg.Pool({
  ssl: {rejectUnauthorized: false},
  connectionString: process.env.DATABASE_URL,
})

export default pool
