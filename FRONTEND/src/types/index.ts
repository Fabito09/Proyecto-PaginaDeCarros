export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  range_km: number;
  battery_kwh: number;
  power_hp: number;
  charge_time_h: number;
  top_speed_kmh: number;
  acceleration_0_100: number;
  images: string[];
  description: string;
  features: string[];
  is_featured: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  car_interest?: string;
  created_at: string;
  read: boolean;
}
