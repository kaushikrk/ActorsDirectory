import { Production } from "./models/Production";

export class ActorModel {
    
    public actorId: number;
    public actorName: string;
    public actorPassword:string;
    public actorGender: string;
    public profileType: string;
    public actorPhoto: string[]=[];
    public actorPhotos: File[]=[];
    public Language: string[];
    public Height: String;
    public Weight: String;
    public actorAge: number;
    public actorMovies: string;
    public actorContactNumber:number;
    public rating: String
    public actorContactConsent:boolean;
    public actorFiltered:boolean;
    public actorLocation:string;
    public Languages:string[];
    public movieUrl:String;
    public aboutActor:String;
    public organizationType:String;
    public instaLink:String;
    public fbLink:String;
    public website:String;
    public otherProfile:String;
    public serviceCost:number;
    public productions:Production[]=[];
    constructor() {
    }
}
