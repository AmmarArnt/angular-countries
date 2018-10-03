import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../shared/entities/country.entity';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {

  @Input() country: Country;

  constructor() {
  }

  ngOnInit() {
  }

}
