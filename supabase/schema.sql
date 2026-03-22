-- VibeMax Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'pro', 'unlimited')),
  credits_used integer default 0,
  credits_limit integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Vibe Runs table
create table if not exists public.vibe_runs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  category text not null,
  status text default 'pending' check (status in ('pending', 'running', 'completed', 'failed')),
  input text not null,
  output text,
  steps jsonb default '[]'::jsonb,
  credits_used integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Templates table
create table if not exists public.templates (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  category text not null,
  input_template text not null,
  tags text[] default '{}',
  uses_count integer default 0,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.vibe_runs enable row level security;
alter table public.templates enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Vibe runs policies
create policy "Users can view own runs" on public.vibe_runs
  for select using (auth.uid() = user_id);

create policy "Users can insert own runs" on public.vibe_runs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own runs" on public.vibe_runs
  for update using (auth.uid() = user_id);

-- Templates policies (public read)
create policy "Templates are publicly readable" on public.templates
  for select using (true);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_vibe_runs_updated_at before update on public.vibe_runs
  for each row execute function public.update_updated_at_column();

-- Enable realtime for vibe_runs
alter publication supabase_realtime add table public.vibe_runs;

-- Seed some starter templates
insert into public.templates (title, description, category, input_template, tags, is_featured, uses_count) values
  ('Cold Email Campaign', 'Generate a high-converting cold email sequence targeting your ideal customer profile.', 'Sales', 'Create a cold email campaign for a [product/service] targeting [target audience] in the [industry] industry. Our main value proposition is [value prop].', ARRAY['email', 'sales', 'outreach'], true, 0),
  ('Lead Qualification Pipeline', 'Automatically qualify and score leads based on BANT framework.', 'Sales', 'Qualify leads for [company/product] in the [industry] space. Target company size: [size]. Budget range: [budget]. Key decision makers: [roles].', ARRAY['leads', 'qualification', 'sales'], true, 0),
  ('Market Research Brief', 'Get comprehensive market analysis for your target segment.', 'Research', 'Conduct market research for [product/service] in [geography/market]. Competitors include [competitors]. Our differentiation is [differentiation].', ARRAY['research', 'market', 'analysis'], false, 0),
  ('Partnership Outreach', 'Craft compelling partnership proposals to win strategic allies.', 'Business Development', 'Create a partnership proposal reaching out to [partner type] companies. We offer [what you offer]. We''re looking for [what you need]. Our company: [brief description].', ARRAY['partnerships', 'b2b', 'development'], false, 0),
  ('Investor Outreach', 'Professional investor outreach emails for fundraising campaigns.', 'Fundraising', 'Create investor outreach for [company] raising [amount] for [round]. We are a [description] with [traction]. Looking for [investor type].', ARRAY['investors', 'fundraising', 'startup'], true, 0),
  ('Product Launch Campaign', 'Multi-channel launch campaign for new product or feature releases.', 'Marketing', 'Launch campaign for [product name] — [one-line description]. Target users: [audience]. Launch date: [date]. Key features: [features]. Channels: [channels].', ARRAY['launch', 'marketing', 'product'], false, 0);
