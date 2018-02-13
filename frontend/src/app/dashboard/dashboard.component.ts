import { Component, OnInit } from '@angular/core';

import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  getUsers() {
    this.userService.getUsers()
    .subscribe((res: any) => {
      console.log(res);
    }, (err => {
      console.log('Deu ruim');
      console.log(err);
    }));
  }

}
