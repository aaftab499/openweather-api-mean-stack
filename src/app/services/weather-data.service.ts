import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor(private http: HttpClient) { }

  getWeatherData(location) {
    console.log('location: ', location);
    let locationCoords = {
      'lat': location.coords.latitude,
      'long': location.coords.longitude
    }
    console.log(locationCoords);
    return this.http.post('/getData', locationCoords);
  }
}
