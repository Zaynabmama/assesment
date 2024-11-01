import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { adminGuard, authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: NavbarComponent , canActivate: [authGuard] },//will change it later
  { path: 'admin', component: NavbarComponent ,canActivate: [adminGuard]  },//will change it later
 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];