import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Injectable()
export class SeoService{

    constructor(private meta: Meta){
        
    }
    updateMetaForPage(tags:any){
        this.meta.addTag(tags);
    }
    updateMultiMetaForPage(tags:any){
        this.meta.addTags(tags);
    }
}