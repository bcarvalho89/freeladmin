import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../common/services/authentication.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  doLogout() {
    this.authService.logout();
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
