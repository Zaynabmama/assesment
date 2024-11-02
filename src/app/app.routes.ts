import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { adminGuard, authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent , canActivate: [authGuard] },
  { path: 'admin', component: NavbarComponent ,canActivate: [adminGuard]  },//will change it later
  { path: 'product/:id', component: ProductDetailComponent ,canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];