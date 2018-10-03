import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BorderCoordinates} from '../entities/border-coordinates.entity';
import {map} from 'rxjs/operators';
import {LatLngLiteral} from '../entities/lat-lng-literal.entity';
import {endpointFusionTable} from '../constants/endpoints';
import {googleCloudApiKey, fusionTableName} from '../constants/map';

@Injectable({
  providedIn: 'root'
})
export class BorderService {


  constructor(private http: HttpClient) {
  }

  getBorder(iso: string): Observable<BorderCoordinates> {
    const sql = `SELECT geometry FROM ${fusionTableName} WHERE iso_a3 = '${iso}'`;

    return this.http.get(endpointFusionTable + sql + '&key=' + googleCloudApiKey).pipe(
      map((obj) => this.extractCoordinates(obj))
    );
  }

  private extractCoordinates(obj: Object): BorderCoordinates {

    if (obj == null) {
      return null;
    }

    if (!obj.hasOwnProperty('rows') || obj['rows'].length === 0) {
      return null;
    }

    const temp = obj['rows'][0];

    if (temp == null || temp.length === 0) {
      return null;
    }

    const result = temp[0];


    const border: BorderCoordinates = {
      coordinates: [],
    };

    if (result.type === 'GeometryCollection') {
      for (const polygon of result.geometries) {
        if (polygon.type === 'Polygon') {
          const path = this.extractPath(polygon.coordinates);
          border.coordinates.push(path);
        }
      }
    } else if (result.geometry.type === 'Polygon') {
      const path = this.extractPath(result.geometry.coordinates);
      border.coordinates.push(path);
    }


    return border;

  }

  private extractPath(res: any) {
    const ret = [];
    for (const path of res) {
      const coordinates = [];
      for (const coordinate of path) {
        const latLngLiteral: LatLngLiteral = {lat: coordinate[1], lng: coordinate[0]};
        coordinates.push(latLngLiteral);
      }
      ret.push(coordinates);
    }
    return ret;
  }
}
