import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, Injectable, ViewChild} from '@angular/core'
import { fromEvent, timer } from 'rxjs';
import { exhaustMap, finalize, pluck, switchMap, switchMapTo, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

@Injectable()
export class AppComponent {

  constructor(private http: HttpClient) {

  }

public ngOnInit() {

const startButton = document?.getElementById('start');
const stopButton = document?.getElementById('stop');
const pollingStatus= document?.getElementById('polling-status');
const dogImage: any  = document?.getElementById('dog');

// streams
const startClick$ = fromEvent(startButton, 'click');
const stopClick$ = fromEvent(stopButton, 'click');

startClick$
  .pipe(
    exhaustMap(() =>
      timer(0, 5000).pipe(
        tap(() => (pollingStatus.innerHTML = 'Active')),
        switchMap(() => 
          this.http.get('https://random.dog/woof.json').pipe(pluck('url'))
        ),
        takeUntil(stopClick$),
        finalize(() => (pollingStatus.innerHTML = 'Stopped'))
      )
    )
  )
  .subscribe(url => (dogImage.src = url));
}
}

