const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('No DATABASE_URL in env');
  process.exit(1);
}

(async () => {
  const client = new Client({ connectionString: DATABASE_URL });
  try {
    await client.connect();
    const res = await client.query("SELECT * FROM \"_prisma_migrations\" ORDER BY started_at;");
    console.log('rows:', res.rows);
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    await client.end();
  }
})();
