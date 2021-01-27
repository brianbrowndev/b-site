import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <masthead></masthead>
    <main class="pt-5 pb-5 mb-5">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor() { }
}
