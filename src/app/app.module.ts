import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MastheadComponent } from './masthead/masthead.component';
import { PostComponent } from './post/post.component';
import { PageComponent } from './page/page.component';

import { MarkdownService } from './markdown.service';
import { PostsComponent } from './posts/posts.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MomentPipePipe } from './moment-pipe.pipe';
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { MapComponent } from './map/map.component';

import { MapService } from './map.service';
import { BikeCommute } from './maps/bike-commute';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent,
    PostsComponent,
    PostCardComponent,
    SidebarComponent,
    MomentPipePipe,
    PostHeaderComponent,
    PostFooterComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    BikeCommute,
    MapService, 
    MarkdownService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
