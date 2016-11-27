import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { PostsComponent } from './posts/posts.component';

import { Pages } from './pages';
import { Posts } from './posts';

const post: string = 'assets/post/'; 
const appRoutes: Routes = [
  { path: 'posts', component: PostsComponent},  
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
