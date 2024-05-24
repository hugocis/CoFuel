import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rtkdzocthwbrgxbgiwjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0a2R6b2N0aHdicmd4Ymdpd2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDEwODgsImV4cCI6MjAyOTQ3NzA4OH0.vQnReElTTLXnexvepKnvxdGHEKygH81Tw1MLNj2oUP0';

export const supabase = createClient(supabaseUrl, supabaseKey);
