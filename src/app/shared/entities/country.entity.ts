export class Country {

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

  static fromJson(json: Object) {
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

  private static extractCurrencies(list: Object[]) {
    return (list || []).map(item => item['name']);
  }

  private static maybeEmpty(val: string) {
    if (val == null || val.length === 0) {
      return 'N/D';
    }
    return val;
  }
}

