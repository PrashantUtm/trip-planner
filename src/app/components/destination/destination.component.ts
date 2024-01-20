import { Component, Input, OnInit } from '@angular/core';
import { Destination } from 'src/app/models/destination';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent  implements OnInit {
  @Input() public destination: Destination = {
    date: new Date(),
    name: ''
  }

  constructor() { }

  ngOnInit() {}

}
