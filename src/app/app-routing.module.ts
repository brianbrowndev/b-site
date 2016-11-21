import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';

import { Pages } from './pages';

const post: string = 'assets/post/'; 
const appRoutes: Routes = [
  { path: 'about', component: PageComponent, data: Pages.About },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
