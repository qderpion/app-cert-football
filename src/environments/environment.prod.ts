import { AppConfiguration } from '../app/interfaces/app-configuration.interface';

export const environment: AppConfiguration = {
  type: 'production',
  api: {
    key: 'ef7c9bf5530a1fc8c79798a97dac1984',
    url: 'https://v3.football.api-sports.io/',
    path: {
      'get-standings': 'standings',
      'get-fixtures': 'fixtures',
    },
  },
  leagues: [
    { name: 'england', id: 39 },
    { name: 'spain', id: 140 },
    { name: 'germany', id: 78 },
    { name: 'france', id: 61 },
    { name: 'italy', id: 135 },
  ],
};
