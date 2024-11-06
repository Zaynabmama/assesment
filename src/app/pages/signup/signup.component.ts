import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, ButtonComponent,RouterModule ,CommonModule]
})
export class SignupComponent {
  
  
  email = signal<string>('');
  password = signal<string>('');
  errorMessage = signal<string | null>(null);
  constructor(private authService: AuthService) {} 


  
  

  onSubmit() {
    this.authService.signup(this.email(), this.password());
  }
}
