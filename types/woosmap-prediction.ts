export interface WoosmapPrediction {
    description: string;
    id: string;
    properties: {
      street_address?: string;
      city?: string;
      postal_code?: string;
      country_code?: string;
    };
  }

  export interface WoosmapAddress {
    street: string;
    city: string;
    postcode: string;
    country: string;
  
  }