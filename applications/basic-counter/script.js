import { fromEvent, interval, merge, NEVER, timer } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');
const interval$ = interval(1000);
let sub;

start$.subscribe(() => {
  sub = interval$.subscribe(setCount);
});

pause$.subscribe(() => {
  sub && sub.unsubscribe();
});
