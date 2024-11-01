import { CanActivateFn } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  const user = auth.currentUser; 
  const router = inject(Router); 
  
  if (user) {
  return true;
} else {

  router.navigate(['/login']);
  return false;
}

};
export const adminGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  const user = auth.currentUser; 
  const router = inject(Router);
  
  if (user) {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole === 'admin') {
      return true;
    } else {
      router.navigate(['/home']);
      return false; 
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
