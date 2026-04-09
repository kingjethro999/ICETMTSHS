-- Conference OS Schema (ICETMTSHS 2026)

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
    CREATE POLICY "Admins can manage settings" ON public.conference_settings FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Content: Public can read, Admins can edit
    CREATE POLICY "Allow public read for content" ON public.homepage_content FOR SELECT USING (is_published = true);
    CREATE POLICY "Admins can manage content" ON public.homepage_content FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Gallery: Public can read, Admins can edit
    CREATE POLICY "Allow public read for gallery" ON public.gallery_items FOR SELECT USING (true);
    CREATE POLICY "Admins can manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Registrations: Admins can manage, Public can insert
    CREATE POLICY "Admins can manage registrations" ON public.registrations FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
    CREATE POLICY "Public can submit registrations" ON public.registrations FOR INSERT TO anon WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
