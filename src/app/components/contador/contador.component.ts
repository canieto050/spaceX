import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';
import { Marcador } from '../../classes/marcador.class';

//consultas graphql

const LAUNCHESPAST = gql`query{  launchesPast {
    launch_site {
      site_id
      site_name
    }
    launch_date_utc
    launch_success
    id
  
    rocket {
      rocket_name
      rocket_type
    }
  }
} `;
const LAUNCHPADS = gql`query{  
  
  launchpads {
    id
    
  location {
    latitude
    longitude
  }
  
    vehicles_launched{
      id
      name
    }
    
  name
}
} `;


@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styles: ['agm-map { height: 300px; /* height is required */ }']
})

export class ContadorComponent implements OnInit {

  public launchpads: any[] = [];
  public launchesp: any[] = [];
  private query: QueryRef<any>;
  public result : any;
  public counter : any;
  public rocketname : any;
  public rockets: any;
  public marcadores: Marcador[] = [];
  

  constructor( private apollo: Apollo,
    private route:ActivatedRoute) 
  {}
  

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('name')
    this.marcadores = [];

    this.route.params.subscribe( params => {
      this.rocketname = params['name'];
      this.consultar();
      this.listarmaps();
    });
    
  }


  consultar()
  {  
    this.query = this.apollo.watchQuery({
      query: LAUNCHESPAST,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.launchesp = result.data.launchesPast;

      //filtra por nombre de la nave
      let filtered = this.launchesp.filter(item=> item.rocket.rocket_name == this.rocketname);
      
      //funcion de contador de dias sin accidentes desde el ultimo accidente
      this.counter = 0;
      for(let i of filtered){
        if(i.launch_success == true){
          this.counter++;
        }
        else{
          break;
        }
      }

    });
  }


  listarmaps()
  {  
    this.marcadores = [];

    this.query = this.apollo.watchQuery({
      query: LAUNCHPADS,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.launchpads = result.data.launchpads;

      //inserta ubicaciones de la consulta al array donde el nombre de la nave sea igual a que llega por parametro
      for(let site of this.launchpads){
        for(let vehicle of site.vehicles_launched){
          if( vehicle.name == this.rocketname){
            let nuevomarcador = new Marcador( site.location.latitude , site.location.longitude );
            this.marcadores.push( nuevomarcador );
            break;
          }
        }
      }
        });

      }



}
