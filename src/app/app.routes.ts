import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    title: 'Board',
    loadComponent: () =>
      import('./main/main.component').then((v) => v.MainComponent),
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
