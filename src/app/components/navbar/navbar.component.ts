import { Component, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { getWeatherIcon } from '../../utils/weather-utils';

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
    return weather ? getWeatherIcon(weather.weathercode) : undefined;
  });

  temperature = computed(() => {
    const weather = this.weatherService.currentWeather();
    return weather ? weather.temperature : undefined;
  });

  constructor(private router: Router,private authService: AuthService,  private weatherService: WeatherService) {}
  

  ngOnInit() {
    const latitude = 33.888630;
    const longitude = 35.495480;
    this.weatherService.getWeather(latitude, longitude);
  }

  logout() {
      this.authService.logout();
 
}
  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
