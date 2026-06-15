-- ============================================================
-- ElectroAuto — Schema SQL para Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── EXTENSIONES ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── TABLA: cars ─────────────────────────────────────────────
create table if not exists public.cars (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text unique not null,
  name                text not null,
  brand               text not null,
  model               text not null,
  year                int not null,
  price               numeric(12, 2) not null,
  range_km            int not null,
  battery_kwh         numeric(6, 1) not null,
  power_hp            int not null,
  charge_time_h       numeric(4, 1) not null,
  top_speed_kmh       int not null,
  acceleration_0_100  numeric(4, 1) not null,
  images              text[] default '{}',
  description         text default '',
  features            text[] default '{}',
  is_featured         boolean default false,
  created_at          timestamptz default now()
);

-- ── TABLA: contact_messages ─────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        varchar(100) not null check (char_length(name) >= 2),
  email       varchar(254) not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone       varchar(20),
  message     varchar(2000) not null check (char_length(message) >= 10),
  car_interest varchar(200),
  read        boolean default false,
  created_at  timestamptz default now()
);

-- ── RLS: Habilitar Row Level Security ───────────────────────
alter table public.cars enable row level security;
alter table public.contact_messages enable row level security;

-- ── POLÍTICAS: cars ─────────────────────────────────────────
-- Cualquiera puede leer carros (catálogo público)
create policy "cars_select_public"
  on public.cars for select
  using (true);

-- Solo usuarios autenticados (admin) pueden insertar/actualizar/eliminar
create policy "cars_insert_admin"
  on public.cars for insert
  to authenticated
  with check (true);

create policy "cars_update_admin"
  on public.cars for update
  to authenticated
  using (true);

create policy "cars_delete_admin"
  on public.cars for delete
  to authenticated
  using (true);

-- ── POLÍTICAS: contact_messages ─────────────────────────────
-- Cualquiera (anon) puede insertar un mensaje de contacto
create policy "messages_insert_public"
  on public.contact_messages for insert
  with check (true);

-- Solo el admin autenticado puede leer los mensajes
create policy "messages_select_admin"
  on public.contact_messages for select
  to authenticated
  using (true);

-- Solo el admin puede actualizar (marcar como leído)
create policy "messages_update_admin"
  on public.contact_messages for update
  to authenticated
  using (true);

-- ── STORAGE: Bucket para imágenes de carros ─────────────────
insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do nothing;

-- Cualquiera puede ver imágenes
create policy "car_images_select_public"
  on storage.objects for select
  using (bucket_id = 'car-images');

-- Solo autenticados pueden subir imágenes
create policy "car_images_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'car-images');

create policy "car_images_delete_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'car-images');

-- ── DATOS DE EJEMPLO ─────────────────────────────────────────
-- (Opcional) Descomenta para insertar carros de prueba
/*
insert into public.cars
  (slug, name, brand, model, year, price, range_km, battery_kwh,
   power_hp, charge_time_h, top_speed_kmh, acceleration_0_100,
   description, is_featured)
values
  ('tesla-model-3-2024', 'Model 3 Long Range', 'Tesla', 'Model 3', 2024,
   1200000, 629, 82, 358, 8.5, 225, 4.4,
   'El sedán eléctrico más popular del mundo con tecnología Autopilot.', true),

  ('byd-atto-3-2024', 'Atto 3', 'BYD', 'Atto 3', 2024,
   850000, 480, 60.5, 204, 7.0, 160, 7.3,
   'SUV eléctrico con excelente relación calidad-precio.', false),

  ('hyundai-ioniq6-2024', 'IONIQ 6', 'Hyundai', 'IONIQ 6', 2024,
   1350000, 614, 77.4, 239, 5.2, 185, 5.1,
   'Diseño aerodinámico futurista con carga ultra-rápida de 800V.', true);
*/
