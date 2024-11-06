import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMessage = signal<string | null>(null);

  constructor(private router: Router) {}

  signup(email: string, password: string) {
    const auth = getAuth();
    const db = getFirestore();
    
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          role: "customer",
        });
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userRole', 'customer');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.handleError(error);
      });
  }


  login(email: string, password: string) {
    const auth = getAuth();
    const db = getFirestore();

    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData['role'];
          sessionStorage.setItem('userEmail', email);
          sessionStorage.setItem('userRole', userRole);

          if (userRole === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userRole');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.handleError(error);
    });
  }

  private handleError(error: any) {
    this.errorMessage.set('An error occurred. Please try again later.');
    console.error(error);
  }
}
