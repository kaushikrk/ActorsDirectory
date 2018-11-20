export class Configuration{
    profileType: string[];
    cities: string[];
    gender: string[];
    constructor(){
        this.cities=["Chennai","Hyderabad","Bangalore","Kochi","Mumbai"];
        this.gender=["Male","Female","Others"];
        this.profileType=["Actor","Photographer","Singer","Choreographer","Editor","Technician","Composer"];
    }
}