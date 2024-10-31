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
    postcode: string;
    city: string;
    street: string;
  }