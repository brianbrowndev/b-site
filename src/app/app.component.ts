import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <masthead></masthead>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor() { }
}
