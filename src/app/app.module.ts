import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

// app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// modules
import { CoreModule } from './core';
import { VisualModule } from './visuals';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    VisualModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
