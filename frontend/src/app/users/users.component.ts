import { Component, OnInit } from '@angular/core';

import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  getUsers() {
    // this.userService.getUsers()
    // .subscribe((res: any) => {
    //   console.log(res);
    // }, (err => {
    //   console.log('Deu ruim');
    //   console.log(err);
    // }));
  }

}
