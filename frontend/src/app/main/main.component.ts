import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
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
        icon: 'home'
      },
      {
        label: 'MAIN_MENU.CONTACTS',
        link: ['/contacts'],
        icon: 'account_box'
      },
      {
        label: 'MAIN_MENU.TODO',
        link: ['/todo'],
        icon: 'check_box'
      },
      {
        label: 'MAIN_MENU.CALENDAR',
        link: ['/calendar'],
        icon: 'today'
      },
      {
        label: 'MAIN_MENU.PROJECTS',
        link: ['/projects'],
        icon: 'apps'
      },
      {
        label: 'MAIN_MENU.INVOICES',
        link: ['/invoices'],
        icon: 'receipt'
      },
      {
        label: 'MAIN_MENU.SETTINGS',
        icon: 'settings',
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

}
