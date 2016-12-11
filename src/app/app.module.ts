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
import { MomentPipe } from './moment.pipe';
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { MapComponent } from './map/map.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { MapService } from './map.service';
import { BikeCommute } from './maps/bike-commute';
import { DclWrapperComponent } from './dcl-wrapper/dcl-wrapper.component';
import { VectorTilesComponent } from './maps/vector-tiles/vector-tiles.component';

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
    MomentPipe,
    PostHeaderComponent,
    PostFooterComponent,
    MapComponent,
    NotfoundComponent,
    DclWrapperComponent,
    VectorTilesComponent,
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
  entryComponents: [
    VectorTilesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
