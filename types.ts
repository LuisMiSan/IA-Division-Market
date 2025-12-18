
export interface App {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  downloadUrl: string;
  demoUrl: string;
  coverUrl?: string;
}

export interface SiteConfig {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactDescription: string;
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
    github: string;
  };
}
