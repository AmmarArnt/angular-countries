import {BorderCoordinates} from './border-coordinates.entity';

/**
 * Data structure: Country
 */
export class Country {

  /**
   * country border
   *
   * Will be loaded, only if it's needed.
   */
  border: BorderCoordinates = undefined;

  /**
   * Constructor
   * @param name country name
   * @param id alpha code (3 characters)
   * @param flag absolute path to flag
   * @param population population
   * @param region region - e.g. europe or africa
   * @param capital capital of the country
   * @param timezones list of timeszone as string array
   * @param currencies list of currencies as string array
   * @param latlng one coordinate as map marker - will be used, if no border can be loaded
   * @param area size of the country - a criteria for map zoom level
   */
  constructor(
    public name: string,
    public id: string,
    public flag: string,
    public population: number,
    public region: string,
    public capital: string,
    public timezones: string[],
    public currencies: string[],
    public latlng: [number, number],
    public area: number,
  ) {

  }

  /**
   * Create a {@link Country} from a JSON object - provided by a backend service.
   * @param json raw JSON object
   * @return new {@link Country} from a JSON object
   */
  static fromJson(json: Object): Country {
    const c = new Country(
      json['name'],
      json['alpha3Code'],
      json['flag'],
      json['population'],
      Country.maybeEmpty(json['region']),
      Country.maybeEmpty(json['capital']),
      json['timezones'],
      Country.extractCurrencies(json['currencies']),
      json['latlng'],
      json['area'],
    );

    return c;
  }

  /**
   * Extract the currencies names from a JSON array.
   * @param list raw JSON array
   * @return currencies names
   */
  private static extractCurrencies(list: Object[]): string[] {
    return (list || []).map(item => item['name']);
  }

  /**
   * Helper method
   *
   * Backend service provided maybe some empty values (<code>null</code>, <code>undefined</code> or empty string).
   * This method will replace the empty values with <code>N/D</code>.
   *
   * @param val maybe empty value
   * @return a not empty string or <code>N/D</code>
   */
  private static maybeEmpty(val: string): string {
    if (val == null || val.length === 0) {
      return 'N/D';
    }
    return val;
  }
}

