export class Configuration{
    profileType: string[];
    cities: string[];
    gender: string[];
    organizationType:String[];
    constructor(){
        this.cities=["Chennai","Bangalore","Mysore","Hyderabad"];
        this.gender=["Male","Female","Others"];
        this.profileType=["Actor","Caterer","Event Managers","Photographer","Web Designer","Others"];
        this.organizationType=["Individual","Company"];
    }
}