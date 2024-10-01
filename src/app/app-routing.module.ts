import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleCountryComponent } from './pages/single-country/single-country.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    component: SingleCountryComponent,
    pathMatch:'full'
  },
  {
    path: 'notFound', // wildcard
    component: NotFoundComponent,
    pathMatch:'full'

  },
  {
    path: '**', redirectTo: '/notFound'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
