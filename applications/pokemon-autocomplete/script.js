import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  pluck,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  clearResults,
  endpoint,
  endpointFor,
  search,
} from '../pokemon/utilities';

const search$ = fromEvent(search, 'input').pipe(
  debounceTime(1000),
  map((event) => event.target.value),
  // distinctUntilChanged(),
  switchMap((searchTerm) =>
    fromFetch(endpoint + searchTerm + '?delay=500&chaos=true').pipe(
      mergeMap((response) => response.json()),
    ),
  ),
  tap(clearResults),
  map((response) => response.pokemon),
  tap(addResults),
);

search$.subscribe(console.log);
