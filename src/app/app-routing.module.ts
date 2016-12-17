import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { MapComponent } from './map/map.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Pages } from './pages';


const post: string = 'assets/post/'; 
const appRoutes: Routes = [
  { path: 'map/:map', component: MapComponent },
  { path: 'post/:post', component: PostComponent },
  { path: 'posts/category/:category', component: HomeComponent },
  { path: 'posts', component: HomeComponent },  
  { path: 'about', component: PageComponent, data: Pages.About },
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
