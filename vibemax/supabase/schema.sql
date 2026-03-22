-- VibeMax Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  username TEXT UNIQUE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'unlimited')),
  credits_used INTEGER DEFAULT 0,
  credits_limit INTEGER DEFAULT 50,
  grok_api_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- VIBES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS vibes (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'running', 'completed', 'failed', 'paused')),
  category TEXT DEFAULT 'Sales',
  total_credits INTEGER DEFAULT 0,
  projected_roi DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vibes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vibes" ON vibes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vibes" ON vibes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vibes" ON vibes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vibes" ON vibes
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- VIBE RUNS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS vibe_runs (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  goal TEXT NOT NULL,
  category TEXT DEFAULT 'Sales',
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'paused')),
  steps JSONB DEFAULT '[]',
  total_credits INTEGER DEFAULT 0,
  projected_roi DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vibe_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vibe runs" ON vibe_runs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vibe runs" ON vibe_runs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vibe runs" ON vibe_runs
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- MARKETPLACE VIBES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS marketplace_vibes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Sales',
  tags TEXT[] DEFAULT '{}',
  preview_steps TEXT[] DEFAULT '{}',
  uses INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 5.0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE marketplace_vibes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published vibes" ON marketplace_vibes
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authors can manage own vibes" ON marketplace_vibes
  FOR ALL USING (auth.uid() = author_id);

-- ============================================
-- TRIGGERS: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, plan, credits_limit)
  VALUES (
    NEW.id,
    NEW.email,
    'free',
    50
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- REALTIME: Enable for live workspace updates
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE vibe_runs;
ALTER PUBLICATION supabase_realtime ADD TABLE vibes;
