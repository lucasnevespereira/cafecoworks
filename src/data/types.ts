export interface Cafe {
  name: string;
  slug: string; // Auto-generated from filename, always present in final data
  description: string;
  city: string;
  country: string;
  address: string;
  tags: string[];
  image: string; // Auto-discovered from images directory, always present in final data
  lat: number;
  lng: number;
  featured: boolean;
  contributor?: string;
}