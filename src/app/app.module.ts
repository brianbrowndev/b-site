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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    MarkdownService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
