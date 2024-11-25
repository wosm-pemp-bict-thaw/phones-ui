import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
