import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  apiKey = '1635890035cbba097fd5c26c8ea672a1';

  getWeatherData(city: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    );
  }
}
