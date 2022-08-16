import {
  fromEvent,
  interval,
  mapTo,
  merge,
  NEVER,
  scan,
  skipUntil,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

const counter$ = merge(start$, pause$).pipe(
  switchMap((isRunning) => (isRunning ? interval(1000) : NEVER)),
  scan((total) => total + 1, 0),
);

counter$.subscribe(setCount);
