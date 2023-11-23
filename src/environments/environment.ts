import { AppConfiguration } from '../app/interfaces/app-configuration.interface';

export const environment: AppConfiguration = {
  type: 'development',
  api: {
    key: '6f21415e70fa65a59e776ea20a54f410',
    url: 'https://v3.football.api-sports.io',
    path: {
      'get-standings': '/standings',
      'get-fixtures': '/fixtures',
    },
  },
  leagues: [
    {
      name: 'england',
      id: 39,
    },
    {
      name: 'spain',
      id: 140,
    },
    { name: 'germany', id: 78 },
    { name: 'france', id: 61 },
    { name: 'italy', id: 135 },
  ],
};
