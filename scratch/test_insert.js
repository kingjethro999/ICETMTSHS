const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const testId = '00000000-0000-0000-0000-000000000002'; // New ID
  const { data, error } = await supabase.from('profiles').insert({
    id: testId,
    email: 'test@example.com',
    full_name: 'Test',
    role: 'admin'
  });
  
  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
