import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RickResolver } from './rick.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { rick: RickResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
