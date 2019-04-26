import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'yur-say-hi',
  templateUrl: './say-hi.component.html',
  styleUrls: ['./say-hi.component.scss']
})
export class SayHiComponent implements OnInit {
  isSayHi: boolean;
  sayHiSubscription: Subscription;
  constructor() {}

  ngOnInit() {}

  sayHi() {
    this.sayHiSubscription = this.sayHi$().subscribe();
  }

  private sayHi$() {
    const bufferTime = 50;
    const sayHiAnimationTime = 2_500;
    return of('sayHi').pipe(
      tap(() => {
        this.unSubscribeSayHi();
        this.isSayHi = false;
      }),
      delay(bufferTime),
      tap(() => (this.isSayHi = true)),
      delay(sayHiAnimationTime),
      tap(() => (this.isSayHi = false))
    );
  }

  private unSubscribeSayHi() {
    if (this.sayHiSubscription) {
      this.sayHiSubscription.unsubscribe();
    }
  }
}
