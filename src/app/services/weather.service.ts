import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface WeatherData {
  temperature: number;
  weathercode: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  
  currentWeather = signal<WeatherData | undefined>(undefined);

  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number): void {
    this.http.get<any>(`${this.apiUrl}`, {
      params: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current_weather: 'true',
      },
    }).subscribe({
      next: (response) => {
        this.currentWeather.set(response.current_weather);
      },
      error: (error) => {
        console.error('Weather fetch error:', error);
        this.currentWeather.set(undefined); 
      },
    });
  }
}
