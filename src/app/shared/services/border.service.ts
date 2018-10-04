import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BorderCoordinates} from '../entities/border-coordinates.entity';
import {map} from 'rxjs/operators';
import {LatLngLiteral} from '../entities/lat-lng-literal.entity';
import {endpointFusionTable} from '../constants/endpoints';
import {googleCloudApiKey, fusionTableName} from '../constants/map';

/**
 * Providing countries border
 */
@Injectable({
  providedIn: 'root'
})
export class BorderService {

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Load border for a country
   * @param iso Alpha code (3 characters)
   * @return border for a country or <code>null</code> if there was no appropriate data set
   */
  getBorder(iso: string): Observable<BorderCoordinates> {
    const sql = `SELECT geometry FROM ${fusionTableName} WHERE iso_a3 = '${iso}'`;

    return this.http.get(endpointFusionTable + sql + '&key=' + googleCloudApiKey).pipe(
      map((obj) => this.extractCoordinates(obj))
    );
  }

  /**
   * Helper method
   *
   * Extract border coordinates from a raw JSON object.
   * A border is described by one or multiply polygons.
   *
   * Sample response: border described by one polygon
   *
   * @param obj raw JSON object
   */
  private extractCoordinates(obj: Object): BorderCoordinates {

    // Select first column
    const result = this.selectSqlResult(obj);

    // Ignore empty results
    if (result == null) {
      return null;
    }

    // Prepare border structure
    const border: BorderCoordinates = {
      coordinates: [],
    };

    // Case: Multiply polygons describe the border
    if (result.type === 'GeometryCollection') {
      for (const polygon of result.geometries) {
        if (polygon.type === 'Polygon') {
          const path = this.extractCoordinatesPath(polygon.coordinates[0]);
          border.coordinates.push(path);
        }
      }
    }

    // Case: One polygon describes the border
    else if (result.geometry.type === 'Polygon') {
      const path = this.extractCoordinatesPath(result.geometry.coordinates[0]);
      border.coordinates.push(path);
    }

    // Case: Known description => use the icon as marker

    // Return border
    return border;

  }

  /**
   * Helper method
   *
   * Returns first column of the first row, if these column exists.
   *
   * @param response raw JSON object
   *
   * @return First column of the first row or <code>null</code> if these column doesn't exists.
   */
  private selectSqlResult(response: Object): any {

    // Is result empty?
    if (response == null) {
      return null;
    }

    // Is there a result row?
    if (!response.hasOwnProperty('rows') || response['rows'].length === 0) {
      return null;
    }

    // Select the first result row
    const firstResultRow = response['rows'][0];

    // Check if there a column for this result
    if (firstResultRow == null || firstResultRow.length === 0) {
      return null;
    }

    // Select first column
    return firstResultRow[0];
  }

  /**
   * Helper method
   *
   * Extract border coordinates from one polygon.
   *
   * @param polygon polygon with raw data
   *
   * @return border coordinates from one polygon
   */
  private extractCoordinatesPath(polygon: any): LatLngLiteral[] {
    const coordinates: LatLngLiteral[] = [];
    for (const coordinate of polygon) {
      const latLngLiteral: LatLngLiteral = {lat: coordinate[1], lng: coordinate[0]};
      coordinates.push(latLngLiteral);
    }
    return coordinates;
  }
}
