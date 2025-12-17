import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gxxxgycqqoivkqcpwxvd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4eHhneWNxcW9pdmtxY3B3eHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MzA1NjUsImV4cCI6MjA4MTUwNjU2NX0.Xqi9Pd233PxDfKWhPqfeagIJnyT07pf4C7TafWtMfTU'

export const supabase = createClient(supabaseUrl, supabaseKey)