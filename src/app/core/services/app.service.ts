import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  store = signal<any>(null);

  constructor() { }

}
