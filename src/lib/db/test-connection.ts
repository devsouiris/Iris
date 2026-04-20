import postgres from 'postgres';
import 'dotenv/config';

async function testConnection() {
  const sql = postgres(process.env.DIRECT_URL!, {
    ssl: 'require',
    connect_timeout: 10,
  });

  try {
    console.log('Testing connection to Supabase...');
    const result = await sql`SELECT 1 + 1 AS result`;
    console.log('Connection successful!', result);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await sql.end();
  }
}

testConnection();
