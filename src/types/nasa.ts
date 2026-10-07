// Basically our 'classes' for what is returned.
// This makes it easier for us to show images and treat each piece of media as its own 'object'


export interface NasaItem {
  href: string;
  data: NasaData[];
  links?: NasaLink[];
}

export interface NasaData {
  nasa_id: string;
  title: string;
  description?: string;
  date_created: string;
  media_type: string;
  keywords?: string[];
  center?: string;
  location?: string;
}

export interface NasaLink {
  href: string;
  rel: string;
  render: string;
}

export interface NasaSearchResponse {
  collection: {
    version: string;
    href: string;
    items: NasaItem[];
    metadata?: {
      total_hits: number;
    };
  };
}