import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, Injectable, ViewChild} from '@angular/core'
import { fromEvent, of, timer, combineLatest, combineLatestWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay, exhaustMap, filter, finalize, mergeMap, pluck, share, switchMap, switchMapTo, takeUntil, tap } from 'rxjs/operators';

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

// const startButton = document?.getElementById('start');
// const stopButton = document?.getElementById('stop');
// const pollingStatus= document?.getElementById('polling-status');
// const dogImage: any  = document?.getElementById('dog');

// // streams
// const startClick$ = fromEvent(startButton, 'click');
// const stopClick$ = fromEvent(stopButton, 'click');

// startClick$
//   .pipe(
//     exhaustMap(() =>
//       timer(0, 5000).pipe(
//         tap(() => (pollingStatus.innerHTML = 'Active')),
//         switchMap(() => 
//           this.http.get('https://random.dog/woof.json').pipe(pluck('url'))
//         ),
//         takeUntil(stopClick$),
//         finalize(() => (pollingStatus.innerHTML = 'Stopped'))
//       )
//     )
//   )
//   .subscribe(url => (dogImage.src = url));

function calculateMortgage(interest, loanAmount, loanLength) {
  const calculatedInterest = interest / 1200;
  const total =
    (loanAmount * calculatedInterest) /
    (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

  return total.toFixed(2);
};

// elems
const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.querySelectorAll('.loanLength');
const expected = document.getElementById('expected');

// helpers
const createInputValueStream = elem => {
  return fromEvent(elem, 'input')
  .pipe(map((event: any) => parseFloat(event.target.value)));
};

// simulating a save request
const saveResponse = mortageAmount => {
  return of(mortageAmount).pipe(delay(1000));
};

// streams given from an event to get the monthly rate 
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

const calculation$ = combineLatest(interest$, loanAmount$, loanLength$)
.pipe(
  map(([interest , loanAmount, loanLength]) => {
    return calculateMortgage(interest, loanAmount, loanLength);
  }),
  tap(console.log),
  filter(mortageAmount => !isNaN(mortageAmount)),
  share() 
);

calculation$.subscribe(mortageAmount => {
  expected.innerHTML = mortageAmount;
});

calculation$
  .pipe(mergeMap(mortageAmount => saveResponse(mortageAmount)))
  .subscribe();
}
}
