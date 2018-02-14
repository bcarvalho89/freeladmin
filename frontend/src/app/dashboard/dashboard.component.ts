import { Component, OnInit } from '@angular/core';
// import { trigger, stagger, animate, style, group, query as q, transition, keyframes } from '@angular/animations';

import { UserService } from '../common/services/user.service';

// const query = (s, a, o = { optional: true }) => q(s, a, o);

// export const homeTransition = trigger('homeTransition', [
//   transition(':enter', [
//     query('.block', style({ opacity: 0 })),
//     query('.block', stagger(300, [
//       style({ transform: 'translateY(100px)' }),
//       animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
//     ])),
//   ]),
//   transition(':leave', [
//     query('.block', stagger(300, [
//       style({ transform: 'translateY(0px)', opacity: 1 }),
//       animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(100px)', opacity: 0})),
//     ]))
//   ])
// ]);

@Component({
  selector: 'app-dashboard',
  // animations: [ homeTransition ],
  // host: {
  //   '[@homeTransition]': ''
  // },
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }

}
