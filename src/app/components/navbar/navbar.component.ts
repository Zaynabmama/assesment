import { Component, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';

import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  weatherIcon = computed(() => {
    const weather = this.weatherService.currentWeather();
    return weather ? this.getWeatherIcon(weather.weathercode) : undefined;
  });

  temperature = computed(() => {
    const weather = this.weatherService.currentWeather();
    return weather ? weather.temperature : undefined;
  });

  constructor(private router: Router,  private weatherService: WeatherService) {}
  

  ngOnInit() {
    const latitude = 33.888630;
    const longitude = 35.495480;
    this.weatherService.getWeather(latitude, longitude);
  }

  getWeatherIcon(weatherCode: number): string {
    switch (weatherCode) {
      case 0: return 'fas fa-sun';
      case 1: case 2: case 3: return 'fas fa-cloud-sun';
      case 45: case 48: return 'fas fa-smog';
      case 61: case 63: case 65: return 'fas fa-cloud-showers-heavy';
      default: return 'fas fa-cloud'; 
    }
  }
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
