import pg from 'pg'

const isProduction = process.env.NODE_ENV === 'production'
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(isProduction && {ssl: {rejectUnauthorized: false}}),
})

export default pool
