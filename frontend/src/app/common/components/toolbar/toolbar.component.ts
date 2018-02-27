import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { User } from '../../domain/user/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  @Input() leftnav;
  private showMenuTrigger = false;
  public isFullscreen = false;
  public fullScreenAvailable = document.fullscreenEnabled || document.webkitFullscreenEnabled;

  public isDataAvailable = false;

  public user;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private translate: TranslateService) {
    }

  ngOnInit() {
    this.leftnav.onOpen.subscribe(() => this.showMenuTrigger = false);
    this.leftnav.onClose.subscribe(() => this.showMenuTrigger = true);

    this.getBasicInfo();
  }

  private _requestFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  private _exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  changeLanguage(code) {
    this.translate.use(code);
  }

  doLogout() {
    this.authService.logout();
  }

  toggleFullscreen() {

    if (this.isFullscreen) {
      this._exitFullScreen();
    } else {
      this._requestFullScreen(document.documentElement);
    }

    this.isFullscreen = !this.isFullscreen;
  }

  getBasicInfo() {
    this.userService.getProfile()
    .subscribe(res => {
      this.user = res;
    });
  }

}
