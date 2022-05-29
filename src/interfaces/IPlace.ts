import { IPhoto } from './IPhoto';

export type FSQCategories = {
  id: number;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
};

export type FSQGeocode = {
  main: {
    latitude: number;
    longitude: number;
  };
};

export interface IPlace {
  fsq_id: string;
  categories?: FSQCategories[];
  distance?: number;
  geocodes?: FSQGeocode;
  link?: string;
  location?: {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    neighborhood: string;
    postcode: string;
    region: string;
  };
  name: string;
  timezone?: string;
  photos: IPhoto[];
}
