import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContadorComponent } from './components/contador/contador.component';
import { MenuComponent } from './components/complements/menu/menu.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contador/:name', component: ContadorComponent },
    { path: 'menu', component: MenuComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
