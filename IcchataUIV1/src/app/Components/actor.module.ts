import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from './comment/comment.component';
@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [ActorComponent,ActorDetailsComponent,CommentComponent],
  exports: [ActorComponent,ActorDetailsComponent,CommentComponent]
})
export class ActorModule { }