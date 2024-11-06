export function getWeatherIcon(weatherCode: number): string {
    switch (weatherCode) {
      case 0: return 'fas fa-sun';
      case 1: case 2: case 3: return 'fas fa-cloud-sun';
      case 45: case 48: return 'fas fa-smog';
      case 61: case 63: case 65: return 'fas fa-cloud-showers-heavy';
      default: return 'fas fa-cloud'; 
    }
  }
  