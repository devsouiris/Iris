import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

async function verifyConnection() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  console.log('--- Supabase Connection Diagnostic ---')
  console.log('URL:', url)
  console.log('Key defined:', key ? 'Yes' : 'No')

  if (!url || !key) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or key not found in .env')
    return
  }

  const supabase = createClient(url, key)

  try {
    console.log('\nChecking API status...')
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ API Error:', error.message)
    } else {
      console.log('✅ API Connection: Success (Supabase reachable)')
    }

    console.log('\nChecking Database availability (via PostgREST)...')
    // This tries to list tables in the public schema
    const { data: tables, error: dbError } = await supabase
      .from('_non_existent_table_just_to_test_ping')
      .select('*')
      .limit(1)

    // 404 is actually a "good" sign here (it means we reached the DB and it said table doesn't exist)
    // If it's a network error or 401/403, then it's a real connection issue.
    if (dbError && dbError.code !== '42P01') {
       console.error('❌ Database/API Auth Error:', dbError.message)
    } else {
       console.log('✅ Database API: Success (PostgREST responsive)')
    }

  } catch (err) {
    console.error('❌ Unexpected Error:', err)
  }
}

verifyConnection()
