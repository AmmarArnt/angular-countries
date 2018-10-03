import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../../shared/entities/country.entity';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss']
})
export class FactsComponent implements OnInit {

  @Input() country: Country;

  constructor() {
  }

  ngOnInit() {
  }

}
