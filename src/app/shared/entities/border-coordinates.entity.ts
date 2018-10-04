import {LatLngLiteral} from './lat-lng-literal.entity';

/**
 * Border coordinates
 */
export interface BorderCoordinates {

  /**
   * List of coordinates ({@link LatLanLiteral}) define a polygon.
   *
   * A border is described by one or multiple polygons.
   */
  coordinates: Array<Array<LatLngLiteral>>;
}
