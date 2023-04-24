import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    //WE WAIT 2 SECONDS TO SHOW THE SPINNER LOADER SIMULATING A LONG HTTP REQ RESPONSE TIME
    setTimeout(()=>{
      this.isLoading$.next(false);
    },2000)
    
  }
}
