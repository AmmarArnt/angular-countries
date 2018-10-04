import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../shared/entities/country.entity';
import {googleMapStyle, iconRed, zoomLevels} from '../../../shared/constants/map';
import {BorderCoordinates} from '../../../shared/entities/border-coordinates.entity';
import {BorderService} from '../../../shared/services/border.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  /**
   * Latitude of marker coordinate
   */
  latitude: number;

  /**
   * Longitude of marker coordinate
   */
  longitude: number;

  /**
   * Maps zoom level
   */
  zoom: number;

  /**
   * Path to marker icon
   *
   * Typical: red icon or <code>undefined</code>, if countries border is displayed.
   */
  icon = iconRed;

  /**
   * Google Maps style
   */
  mapStyle = googleMapStyle;

  /**
   * Countries border
   */
  private _border: BorderCoordinates;

  /**
   * Getter => Countries border
   */
  get border(): BorderCoordinates {
    return this._border;
  }

  /**
   * Setter => Countries border
   *
   * * If border exists, the icon marker will removed.
   * * If border **not** exists, the icon marker will displayed.s
   *
   * @param newBorder Countries border
   */
  set border(newBorder: BorderCoordinates) {
    if (newBorder != null && newBorder.coordinates.length > 0) {
      this.icon = undefined;
    } else {
      this.icon = iconRed;
    }

    this._border = newBorder;
  }

  /**
   * Setter for country
   *
   * * Extract the coordinates of this country.
   * * Calculate zoom level
   * * Load border
   *
   * @param newCountry
   */
  @Input() set country(newCountry: Country) {
    if (newCountry == null) {
      return;
    }

    this.extractCoordinates(newCountry);
    this.calculateZoomLevel(newCountry);
    this.loadBorder(newCountry);
  }

  /**
   * Constructor
   * @param borderService
   */
  constructor(private borderService: BorderService) {
  }

  /**
   * Extract coordinates (latitude and longitude) from country
   * @param country
   */
  private extractCoordinates(country: Country) {
    this.latitude = country.latlng[0];
    this.longitude = country.latlng[1];
  }

  /**
   * Calculate zoom level
   *
   * Method: Test if the countries area is to big for a predefined area.
   * * Minimum: 2
   * * Maximum: 9
   *
   * @param country
   */
  private calculateZoomLevel(country: Country) {
    this.zoom = zoomLevels.reduce((zoomLevel: number, maxAreaSize: number) => {
      if (country.area < maxAreaSize) {
        return zoomLevel + 1;
      } else {
        return zoomLevel;
      }
    }, 2);
  }

  /**
   * Get or load border
   *
   * * If there is border locally cached, use the local data.
   * * Otherwise try to load border from {@link BorderService}.
   *
   * @param country
   */
  private loadBorder(country: Country) {
    if (country.border === undefined) {
      this.borderService.getBorder(country.id).subscribe(
        newBorder => {
          country.border = newBorder;
          this.border = newBorder;
        }
      );
    } else {
      this.border = country.border;
    }
  }

}
