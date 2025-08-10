import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvuwueirljdpyazwficj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dXd1ZWlybGpkcHlhendmaWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjY1MTQsImV4cCI6MjA2OTkwMjUxNH0.dNH3ckZeuS9wSBpbFgE4Zb15r6kdSNAHjSb8konkCAs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 