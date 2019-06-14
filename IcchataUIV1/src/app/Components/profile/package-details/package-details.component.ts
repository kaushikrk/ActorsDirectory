import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styles: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  packagesUpdated: boolean;
  @Input() userId: any;
  @Input() pkgs:any=[];
  pkg:FormGroup
  constructor(private fb:FormBuilder, private actorService:ActorService) { 
    
  }

  ngOnInit() {
    this.pkgs=JSON.parse(this.pkgs);
    this.pkg=this.fb.group({
      packageId:new FormControl('', []),
      packageName:new FormControl('', Validators.required),
      packageCost:new FormControl('', [Validators.required]),
      packageDescription:new FormControl('', [Validators.required])
    })
  }
  savepkg(){
    console.log(this.pkg.value);
    if(this.pkg.valid)
    this.actorService.savePackage(this.userId,this.pkg.value).subscribe(data=>{
      this.actorService.getProfile(this.userId).subscribe(data=>{
        this.pkgs=data.uniqueResult.packages;
        this.packagesUpdated=true;
      });
      
    }, err=>{
      console.log(err);
    });
    else
    console.log('details missing');
  }
  editpkg(pkg:any){
    this.pkg.patchValue(pkg);
  }
  deletepkg(pkg:any){
    this.actorService.deletePackage(this.userId,pkg.packageId).subscribe(data=>{
      this.actorService.getProfile(this.userId).subscribe(data=>{
        this.pkgs=data.uniqueResult.packages;
        this.packagesUpdated=true;
      });
    });
  }
}
