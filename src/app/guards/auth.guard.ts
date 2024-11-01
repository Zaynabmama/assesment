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
