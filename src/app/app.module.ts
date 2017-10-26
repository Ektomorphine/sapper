import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SapperPage } from './pages/sapper/sapper.page';

@NgModule({
  declarations: [
    AppComponent,
    SapperPage
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
