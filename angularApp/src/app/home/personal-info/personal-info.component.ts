import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../shared";

@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
@Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
