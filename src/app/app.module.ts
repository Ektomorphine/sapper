import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { SapperPage } from './pages/sapper/sapper.page';
import { HomePage } from './pages/home/home.page';
import { GameOverPage } from './pages/game-over/game-over.page';

const appRoutes: Routes = [
  {path: 'sapper', component: SapperPage},
  {path: 'home', component: HomePage},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'game-over', component: GameOverPage}
];

@NgModule({
  declarations: [
    AppComponent,
    SapperPage,
    HomePage,
    GameOverPage
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
