import { Component, signal } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ButtonComponent,RouterModule,CommonModule]
})
export class LoginComponent {
  email = signal<string>('');
  password = signal<string>('');
  errorMessage = signal<string | null>(null);
  constructor(private router: Router) {} 

  onSubmit() {
    const auth = getAuth();
    const db = getFirestore();
    signInWithEmailAndPassword(auth, this.email(), this.password())
      .then(async(userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData['role'];//gett role from firebose
          sessionStorage.setItem('userEmail', this.email());
          sessionStorage.setItem('userRole', userRole);

        this.errorMessage.set(null); 
        //this.router.navigate(['/home']);
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
  private handleError(error: any) {

    this.errorMessage.set('An error occurred during sign-up. Please try again later');
    
    }
}
