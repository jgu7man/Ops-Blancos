import { Component, Input, OnInit } from '@angular/core';
import { iUser } from 'src/app/models/user.model';

@Component({
  selector: 'g-show-admin',
  templateUrl: './show-admin.component.html',
  styleUrls: ['./show-admin.component.scss']
})
export class ShowAdminComponent implements OnInit {

  @Input() user?: iUser
  constructor() { }

  ngOnInit(): void {
  }

}
