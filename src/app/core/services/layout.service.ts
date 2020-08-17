import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isSidenavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isSidenavCollapsed$: Observable<boolean> = this.isSidenavCollapsed.asObservable();

  constructor() { }

  toggleSidenav(){
    this.isSidenavCollapsed.next(!this.isSidenavCollapsed.getValue());
  }
}
