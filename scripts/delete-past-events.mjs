import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10_000,
  statement_timeout: 60_000,
});

try {
  // `date` stores local wall-clock time (timestamp without time zone).
  // Keep yesterday and today; derive yesterday's midnight in Prague
  // independently of the database session timezone.
  const result = await pool.query(`
    DELETE FROM events
    WHERE date < ((CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Prague')::date - 1)
  `);
  console.log(`Deleted ${result.rowCount} past events`);
} catch (error) {
  console.error("Failed to delete past events:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
