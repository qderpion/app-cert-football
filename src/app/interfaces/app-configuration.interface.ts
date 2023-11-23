import { Environment } from '../utils/types.util';
import { Country } from './data/country.interface';

export interface AppConfiguration {
  type: Environment;
  api: {
    key: string;
    url: string;
    path: {
      [key: string]: string;
    };
  };
  leagues: Country[];
}
