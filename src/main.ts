import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from '../firebase.config';
import { initializeApp } from 'firebase/app';


initializeApp(firebaseConfig);


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));