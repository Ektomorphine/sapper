import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SapperPage } from './pages/sapper/sapper.page';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  { path: 'sapper', component: SapperPage },
  { path: '', component: HomePage }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

