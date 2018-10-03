import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../shared/entities/country.entity';
import {googleMapStyle, iconRed, zoomLevels} from '../../../shared/constants/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;

  icon = iconRed;
  mapStyle = googleMapStyle;

  @Input() set country(newCountry: Country) {
    if (newCountry == null) {
      return;
    }

    this.latitude = newCountry.latlng[0];
    this.longitude = newCountry.latlng[1];

    this.zoom = zoomLevels.reduce((zoomLevel: number, maxAreaSize: number) => {
      if (newCountry.area < maxAreaSize) {
        return zoomLevel + 1;
      } else {
        return zoomLevel;
      }
    }, 2);
  }


  constructor() {
  }

  ngOnInit() {
  }

}
