import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../common/services/user.service';
import { ContactService } from '../common/services/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  contactsSummary: number = 0;

  constructor(
    private userService: UserService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contactService.getSummary()
    .subscribe(res => {
      this.contactsSummary = res.length;
    });
  }

}
