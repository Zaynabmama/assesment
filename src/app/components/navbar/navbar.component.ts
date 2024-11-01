import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  
  logout() {
    const auth = getAuth();
    signOut(auth) 
      .then(() => {
    
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userRole');
    
    this.router.navigate(['/login']); 
  })
  .catch((error) => {
    console.error( error);
  });
}
  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
