import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() leftnav;
  private showMenuTrigger = false;

  constructor( private authService: AuthenticationService ) { }

  ngOnInit() {
    this.leftnav.onOpen.subscribe(() => this.showMenuTrigger = false);
    this.leftnav.onClose.subscribe(() => this.showMenuTrigger = true);
  }

  doLogout() {
    this.authService.logout();
  }

}
