import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';

//consutal a graphql

const EMPLOYEES_QUERY = gql`query { rockets { id name active }}`;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public rockets: any;
  private query: QueryRef<any>;
  public rocketTemp: any;

  constructor( private apollo: Apollo,
    private router:ActivatedRoute,
    private route:Router ) 
  { }

  ngOnInit() {

    this.listar();
    
  }

  //lista por tipos de naves

  listar()
  {  
    this.query = this.apollo.watchQuery({
      query: EMPLOYEES_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.rockets = result.data && result.data.rockets;
    });
  }

  //navegar a la ruta con los parametros

  changeRocket(event){
    this.route.navigateByUrl('/contador/'+event.target.value)
  }


}
