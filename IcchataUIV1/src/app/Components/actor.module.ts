import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [ActorComponent,ActorDetailsComponent],
  exports: [ActorComponent,ActorDetailsComponent]
})
export class ActorModule { }