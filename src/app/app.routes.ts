import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Forge Fitness Torino — Train hard. Live strong.'
  },
  {
    path: 'corsi',
    loadComponent: () => import('./pages/corsi/corsi.component').then((m) => m.CorsiComponent),
    title: 'Corsi — Forge Fitness Torino'
  },
  {
    path: 'abbonamenti',
    loadComponent: () =>
      import('./pages/abbonamenti/abbonamenti.component').then((m) => m.AbbonamentiComponent),
    title: 'Abbonamenti e prezzi — Forge Fitness Torino'
  },
  {
    path: 'trainer',
    loadComponent: () => import('./pages/trainer/trainer.component').then((m) => m.TrainerComponent),
    title: 'I nostri trainer — Forge Fitness Torino'
  },
  {
    path: 'prenota',
    loadComponent: () => import('./pages/prenota/prenota.component').then((m) => m.PrenotaComponent),
    title: 'Prenota la tua sessione — Forge Fitness Torino'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
