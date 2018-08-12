import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { mergeMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <masthead></masthead>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public titleService: Title
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => {
          // traverse down tree and get child
          let route = this.route;
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => {
          return data.title
        })
    ).subscribe(title => this.titleService.setTitle(`${title} | bgeo`));
  }

}
