import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: {
      name: string;
      url: string
  }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.parseRoute(this.router.routerState.snapshot.root);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
    });
  }

  parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {

      let urlSegments: UrlSegment[] = [];

      node.pathFromRoot.forEach(routerState => {
        urlSegments = urlSegments.concat(routerState.url);
      });

      node.data['breadcrumb'].forEach(element => {
        const url = urlSegments.map(urlSegment => {
          return urlSegment.path;
        }).join('/');

        this.breadcrumbs.push({
          name: element,
          url: '/' + url
        });
      });
    }

    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }
}
