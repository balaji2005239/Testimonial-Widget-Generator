export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  photo_url?: string;
  selected?: boolean;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ testimonials: Testimonial[] }>;
}

export interface ThemeConfig {
  primaryColor: string;
  fontStyle: string;
  borderRadius: string;
  shadow: boolean;
}

export interface EmbedOptions {
  limit: number;
  autoscroll: boolean;
  theme: string;
}