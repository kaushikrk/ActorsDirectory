import { ActorModel } from "./Actor.model";


export interface AppState {
  readonly blockchain: ActorModel;
}