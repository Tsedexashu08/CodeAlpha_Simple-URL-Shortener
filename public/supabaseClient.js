const dotenv = require('dotenv');
dotenv.config();
const {createClient} = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'NOT SET');
console.log('Supabase Key:', supabaseKey ? 'Set' : 'NOT SET');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = supabase;