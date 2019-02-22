import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
// import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: 'pets',component: HomeComponent},
  {path: 'pets/new',component: NewComponent},
  {path: 'pets/:id',component: ShowComponent},
  {path: 'pets/:id/edit',component: EditComponent},
  {path: '', pathMatch: 'full', redirectTo: '/pets' },
  // {path: '**', component: PageNotFoundComponent }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
