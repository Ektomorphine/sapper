import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SapperPage } from './pages/sapper/sapper.page';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [
    AppComponent,
    SapperPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
