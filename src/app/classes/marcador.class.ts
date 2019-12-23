

export class Marcador {
    
    public lat: number;
    public lng: number;

    public titulo : string;
    public desc : string;


    constructor( lat:number, lng: number ) {
        this.lat = lat;
        this.lng = lng;
    }
}