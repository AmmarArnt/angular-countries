import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../shared/entities/country.entity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() country: Country;

  constructor() {
  }

  ngOnInit() {
  }

}
