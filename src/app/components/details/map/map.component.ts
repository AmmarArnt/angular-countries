import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../shared/entities/country.entity';
import {googleMapStyle, iconRed, zoomLevels} from '../../../shared/constants/map';
import {BorderCoordinates} from '../../../shared/entities/border-coordinates.entity';
import {BorderServiceService} from '../../../shared/services/border-service.service';
import {BorderService} from '../../../shared/services/border.service';

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


  private _border: BorderCoordinates;

  get border(): BorderCoordinates {
    return this._border;
  }

  set border(newBorder: BorderCoordinates) {
    if (newBorder != null && newBorder.coordinates.length > 0) {
      this.icon = undefined;
    } else {
      this.icon = iconRed;
    }

    this._border = newBorder;
  }


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


    if (newCountry.border === undefined) {
      this.borderService.getBorder(newCountry.id).subscribe(
        newBorder => {
          newCountry.border = newBorder;
          this.border = newBorder;
        }
      );
    } else {
      this.border = newCountry.border;
    }
  }


  constructor(private borderService: BorderService) {
  }

  ngOnInit() {
  }

}
