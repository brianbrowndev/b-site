import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './posts/post/post.component';
import { MapComponent } from './maps/map/map.component';
import { NotfoundComponent } from './core/notfound/notfound.component';


const appRoutes: Routes = [
  { path: 'map/:map', component: MapComponent },
  { path: 'post/:post', component: PostComponent },
  { path: 'posts/category/:category', component: HomeComponent },
  { path: 'posts', component: HomeComponent },  
  { path: 'about', component: PageComponent, data: {pageName:'about'}},
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
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
