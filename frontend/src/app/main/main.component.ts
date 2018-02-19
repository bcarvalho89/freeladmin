import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from './main.animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  animations: [ routerTransition ],
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public menuList: any;
  public selected: any;

  constructor() {
    this.menuList = [
      {
        label: 'MAIN_MENU.HOME',
        link: ['/'],
        icon: 'home',
        isOn: true
      },
      {
        label: 'MAIN_MENU.CONTACTS',
        link: ['/contacts'],
        icon: 'account_box',
        isOn: true
      },
      {
        label: 'MAIN_MENU.TODO',
        link: ['/todo'],
        icon: 'check_box',
        isOn: false
      },
      {
        label: 'MAIN_MENU.CALENDAR',
        link: ['/calendar'],
        icon: 'today',
        isOn: false
      },
      {
        label: 'MAIN_MENU.PROJECTS',
        link: ['/projects'],
        icon: 'apps',
        isOn: false
      },
      {
        label: 'MAIN_MENU.INVOICES',
        link: ['/invoices'],
        icon: 'receipt',
        isOn: false
      },
      {
        label: 'MAIN_MENU.SETTINGS',
        icon: 'settings',
        isOn: true,
        submenu: [
          {
            label: 'MAIN_MENU.USERS',
            link: ['/settings/users']
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

  selectSubmenuItem(item) {
    this.selected = (this.selected === item ? null : item);
  }

  isActiveSubmenu(item) {
    return this.selected === item;
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
