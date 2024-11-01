import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../components/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, ButtonComponent,RouterModule ,CommonModule]
})
export class SignupComponent {
  
  
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 
  constructor(private router: Router) {} 


  // isPasswordValid(): boolean {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  //   return passwordRegex.test(this.password);
  // }
  

  onSubmit() {
    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: this.email,
          role: "customer",  
        });
        sessionStorage.setItem('userEmail', this.email);
        sessionStorage.setItem('userRole', 'customer');
        console.log( user);
        this.errorMessage = '';
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.handleError(error);
      });
    }

  private handleError(error: any) {
    
    this.errorMessage = 'An error occurred during sign-up. Please try again later.';
  
  }
}
