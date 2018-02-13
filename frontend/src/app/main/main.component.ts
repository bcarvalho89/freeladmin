import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService } from '../common/services/authentication.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  private showMenuToggle = false;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sidenav.onOpen.subscribe(() => this.showMenuToggle = false);
    this.sidenav.onClose.subscribe(() => this.showMenuToggle = true);
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
