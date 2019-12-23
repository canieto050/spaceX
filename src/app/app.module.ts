import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


//apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContadorComponent } from './components/contador/contador.component';

//Rutas
import { AppRoutingModule, ROUTES } from './app-routing.module';


//servicios

import { MenuComponent } from './components/complements/menu/menu.component';
import { FooterComponent } from './components/complements/footer/footer.component';

//librerias de maps

import { AgmCoreModule } from '@agm/core'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContadorComponent,
    MenuComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2mgBe79egIa1-Bwhtd97eEMir-eN5X1w'
     
    }),
    RouterModule.forRoot (ROUTES, { useHash: true }),

    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ){
    apollo.create({
      link: httpLink.create({ uri: 'https://api.spacex.land/graphql/'}),
      cache: new InMemoryCache()
    });
  }
 }
