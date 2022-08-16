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
  filter,
  catchError,
  concat,
  take,
  EMPTY,
  takeUntil,
  skip,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
} from '../pokemon/utilities';

const endpoint = 'http://localhost:3333/api/pokemon/';

const input$ = fromEvent(search, 'input');
const search$ = input$.pipe(
  debounceTime(350),
  map((e) => e.target.value),
  distinctUntilChanged(),
  switchMap((searchTerm) => {
    return fromFetch(
      `${endpoint}search/${searchTerm}?delay=500&chaos=true`,
    ).pipe(
      mergeMap((res) => res.json()),
      takeUntil(input$),
    );
  }),
  tap(clearResults),
  map((res) => res.pokemon),
  tap(addResults),
);

search$.subscribe(console.log);
