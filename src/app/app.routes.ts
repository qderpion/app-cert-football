import { Routes } from '@angular/router';
import { FixturesResolver } from './resolvers/fixtures.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'team/:id',
    loadComponent: () =>
      import('./pages/team/team.component').then((c) => c.TeamComponent),
    resolve: {
      fixtures: FixturesResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
