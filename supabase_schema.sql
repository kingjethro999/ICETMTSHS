-- Conference OS Schema (ICSHSM 2026)

-- 1. Profiles (Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'admin', -- 'superadmin', 'admin'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Conference Settings (Global Config like site status, reg toggle)
CREATE TABLE IF NOT EXISTS public.conference_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Homepage Content (Sections: hero, about, venue, fees, bank_details, contact)
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_name TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_published BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery Items
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    caption TEXT,
    year_tag TEXT DEFAULT '2026',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Registrations (Submissions & Payments)
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    institution TEXT,
    submission_type TEXT, -- 'Presenter', 'Participant'
    paper_title TEXT,
    abstract_url TEXT,
    payment_proof_url TEXT,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Paid', 'Rejected'
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conference_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Storage Bucket for Gallery
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Policies
DO $$ 
BEGIN
    -- Profiles: Admins can see and edit their own profiles
    CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
    CREATE POLICY "Admins can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

    -- Settings: Public can read, Admins can edit
    CREATE POLICY "Allow public read for settings" ON public.conference_settings FOR SELECT USING (true);
    CREATE POLICY "Admins can manage settings" ON public.conference_settings FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Content: Public can read, Admins can edit
    CREATE POLICY "Allow public read for content" ON public.homepage_content FOR SELECT USING (is_published = true);
    CREATE POLICY "Admins can manage content" ON public.homepage_content FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Gallery: Public can read, Admins can edit
    CREATE POLICY "Allow public read for gallery" ON public.gallery_items FOR SELECT USING (true);
    CREATE POLICY "Admins can manage gallery" ON public.gallery_items FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Registrations: Admins can manage, Public can insert
    CREATE POLICY "Admins can manage registrations" ON public.registrations FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
    CREATE POLICY "Public can submit registrations" ON public.registrations FOR INSERT TO anon WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 6. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'unsubscribed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Security Events (The Immune System)
CREATE TABLE IF NOT EXISTS public.security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL, -- 'RateLimitAttempt', 'IrregularityDetected'
    ip_hash TEXT NOT NULL,
    severity TEXT DEFAULT 'Low', -- 'Low', 'Medium', 'High'
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Policies for new tables
DO $$ 
BEGIN
    -- Newsletter: Public can insert, Admins can read/manage
    CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
    CREATE POLICY "Admins can manage newsletter" ON public.newsletter_subscribers FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Contact: Public can insert, Admins can read
    CREATE POLICY "Public can send contact messages" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
    CREATE POLICY "Admins can read contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Security: System (anon) can insert, Admins can read
    CREATE POLICY "System can log security events" ON public.security_events FOR INSERT TO anon WITH CHECK (true);
    CREATE POLICY "Admins can view security events" ON public.security_events FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 9. Auth Trigger for Profile Creation
-- This ensures that every time a user signs up via Supabase Auth, 
-- a matching profile is created in the public.profiles table.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Count existing profiles to see if this is the first one
  SELECT count(*) INTO user_count FROM public.profiles;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    CASE WHEN user_count = 0 THEN 'admin' ELSE 'pending' END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- FIX: Ensure the trigger can be executed by the Auth system
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated, service_role;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Default Admin Seed (FOR INITIAL DEPLOYMENT)
-- This injects the superadmin account directly into the database.
-- Run this in the Supabase SQL Editor to enable immediate login.

-- Enable pgcrypto if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert into auth.users (ID is a fixed UUID for seeding)
-- Using a SELECT ... WHERE NOT EXISTS pattern to avoid index-matching issues
INSERT INTO auth.users (
    id, 
    instance_id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    raw_app_meta_data, 
    raw_user_meta_data, 
    created_at, 
    updated_at, 
    role,
    aud,
    confirmation_token
)
SELECT 
    '00000000-0000-0000-0000-000000000001', 
    '00000000-0000-0000-0000-000000000000',
    'idrisahmed@lincoln.edu.my',
    crypt('AdminAccess2026!', gen_salt('bf')), 
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Super Admin"}',
    now(),
    now(),
    'authenticated',
    'authenticated',
    ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'idrisahmed@lincoln.edu.my');

-- Insert into public.profiles (Linked to the auth user above)
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
    '00000000-0000-0000-0000-000000000001',
    'idrisahmed@lincoln.edu.my',
    'Super Admin',
    'admin'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
