import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  weatherForm: NgForm;
  isLoading: boolean = false;
  title = 'weather-app';
  weatherData: any = [];
  ResponseError: any = null;
  constructor(private weatherService: WeatherService) {}

  getWeatherData(weatherForm: NgForm) {
    if (weatherForm.valid) {
      this.weatherData = [];
      this.ResponseError = null;
      this.isLoading = true;
      this.weatherService
        .getWeatherData(weatherForm.controls['city'].value)
        .subscribe(
          (data) => {
            console.log(data);
            this.weatherData = data;
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
            this.ResponseError = `No Data available for ${weatherForm.controls['city'].value} try other city Name`;
          }
        );
    } else {
      weatherForm.controls['city'].markAsDirty();
      weatherForm.controls['city'].markAsTouched();
    }

    console.log(weatherForm);
  }
}
