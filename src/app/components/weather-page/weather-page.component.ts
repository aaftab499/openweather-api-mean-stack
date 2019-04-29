import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})


export class WeatherPageComponent implements OnInit {
  page = 1;
  pageSize = 6;
  collectionSize: any;
  currentPostion: any;
  currentLocation: any;
  weatherList: any;
  weatherData: any;
  showOverlay: boolean = true;
  renderDefault: boolean = false


  constructor(private getData: WeatherDataService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.getLocation();
  }


  // getting geolocation from the current browser.
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentPostion = position;
      console.log(this.currentPostion);
      this.getWeather(this.currentPostion)
    }, (err) => {
      this.renderDefault = true;
      let defaultLocation = {
        coords: {
          'latitude': 51.509865,
          'longitude': -0.118092
        }
      }
      this.getWeather(defaultLocation)
    });
  }

  getWeather(location) {
    console.log('get weather location called');
    // let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=f5f7c182f4a8850365de9575b191124b&units=metric`;
    this.getData.getWeatherData(location).subscribe((res) => {
      console.log(res);
      this.currentLocation = res['city']['name']

      this.weatherList = res['list']
      for (var value of this.weatherList) {
        value.time = new Date(value.dt_txt).toLocaleTimeString();
        value.main.temp = value.main.temp.toFixed()
        value.main.temp_max = value.main.temp_max.toFixed()
        value.main.temp_min = value.main.temp_min.toFixed()
        value.wind.speed = Math.ceil(value.wind.speed);

        if (new Date(value.dt_txt).toDateString() !== new Date().toDateString()) {
          value.dt_txt = new Date(value.dt_txt).toDateString();
        } else {
          value.dt_txt = 'Today'
        }
      }
      this.weatherData = this.weatherList;
      this.collectionSize = this.weatherData.length
      this.showOverlay = false
    })
  }
}
