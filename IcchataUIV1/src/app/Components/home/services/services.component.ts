import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-home-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent{

    @Output() serviceType= new EventEmitter();

    constructor(){

    }
    onIconClick(value:any){
      this.serviceType.emit(value);
    }
}