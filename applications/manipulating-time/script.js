import { fromEvent, interval } from 'rxjs';
import {
  throttleTime,
  debounceTime,
  delay,
  debounce,
  throttle,
  scan,
  map,
  tap,
} from 'rxjs/operators';

import {
  button,
  panicButton,
  addMessageToDOM,
  deepThoughtInput,
  setTextArea,
  setStatus,
} from './utilities';

const panicClick$ = fromEvent(panicButton, 'click');
const buttonClicks$ = fromEvent(button, 'click').pipe(throttle(() => panicClick$));

buttonClicks$.subscribe(addMessageToDOM);
