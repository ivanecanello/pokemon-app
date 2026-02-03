import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CompareComponent } from './pages/compare/compare.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'pokemon/:id',
    component: DetailComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
