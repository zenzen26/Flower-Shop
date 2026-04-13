export interface GalleryItem {
  id: string;
  name: string;
  category: string;
  price: string;
  featured: boolean;
  short_desc: string;
  image_url: string;
}

export interface Step {
  n: string;
  title: string;
  body: string;
}

export interface FormData {
  name: string;
  email: string;
  event: string;
  date: string;
  style: string;
  notes: string;
}