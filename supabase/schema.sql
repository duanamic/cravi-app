-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  instagram_handle text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on users
alter table public.users enable row level security;

create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Recipes table
create table public.recipes (
  id uuid default uuid_generate_v4() not null primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  image_url text,
  source_url text,
  platform text check (platform in ('instagram', 'tiktok', 'other')),
  ingredients jsonb,
  steps jsonb,
  tags jsonb,
  prep_time text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on recipes
alter table public.recipes enable row level security;

create policy "Users can view own recipes"
  on public.recipes for select
  using (auth.uid() = user_id);

create policy "Users can insert own recipes"
  on public.recipes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own recipes"
  on public.recipes for update
  using (auth.uid() = user_id);

create policy "Users can delete own recipes"
  on public.recipes for delete
  using (auth.uid() = user_id);

-- Index for faster queries
create index recipes_user_id_idx on public.recipes(user_id);
create index recipes_created_at_idx on public.recipes(created_at desc);
