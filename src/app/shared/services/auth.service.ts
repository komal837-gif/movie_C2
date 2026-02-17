import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor() { }

  emitLoadingState:Subject<boolean> = new Subject<boolean>()
  emitLoadingState$:Observable<boolean>=this.emitLoadingState.asObservable()

  loadingState(state: boolean) {

    this.emitLoadingState.next(state)
  
  }
}

