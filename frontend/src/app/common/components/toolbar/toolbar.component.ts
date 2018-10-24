import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

import { User } from '../../domain/user/user';

import { MatSidenav  } from '@angular/material/sidenav';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  @Input() leftnav: MatSidenav;
  private showMenuTrigger = false;
  public isFullscreen = false;

  public isDataAvailable = false;

  public user;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private translate: TranslateService,
    private afStorage: AngularFireStorage) {
    }

  ngOnInit() {
    this.leftnav.openedStart.subscribe(() => this.showMenuTrigger = false);
    this.leftnav.closedStart.subscribe(() => this.showMenuTrigger = true);

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
    const fsDoc = <FsDocument> document;

    if (fsDoc.exitFullscreen) {
      fsDoc.exitFullscreen();
    } else if (fsDoc.webkitExitFullscreen) {
      fsDoc.webkitExitFullscreen();
    }
  }

  fullScreenAvailable() {
    const fsDoc = <FsDocument> document;

    return fsDoc.fullscreenEnabled || fsDoc.webkitFullscreenEnabled;
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
      const profileUrlRef = this.afStorage.ref(res.photoURL);

      profileUrlRef.getDownloadURL()
      .subscribe(userImage => {
        res = { avatar: userImage, ...res };

        this.user = res;
      });
    });
  }

}

interface FsDocument extends HTMLDocument {
  webkitFullscreenEnabled?: Boolean;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => void;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
}
