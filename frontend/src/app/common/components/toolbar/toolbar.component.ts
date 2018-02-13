import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() leftnav;
  private showMenuTrigger = false;

  constructor(
    private authService: AuthenticationService,
    private translate: TranslateService) {
    }

  ngOnInit() {
    this.leftnav.onOpen.subscribe(() => this.showMenuTrigger = false);
    this.leftnav.onClose.subscribe(() => this.showMenuTrigger = true);
  }

  changeLanguage(code) {
    this.translate.use(code);
  }

  doLogout() {
    this.authService.logout();
  }

}
