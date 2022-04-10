import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  observeOn,
  queueScheduler,
  withLatestFrom,
} from "rxjs";
import type { Action, Reducer } from "ts-action";

export class QueryStore<State> {
  private _state$ = new BehaviorSubject(this.initialState);
  private _actions$ = new BehaviorSubject({ type: "NONE" });

  state$ = this._state$.asObservable();

  constructor(private initialState: State, private reducer: Reducer<State>) {
    this._actions$
      .pipe(observeOn(queueScheduler), withLatestFrom(this._state$))
      .subscribe(([action, state]) =>
        this.setState(this.reducer(state, action))
      );
  }

  dispatch(action: Action) {
    this._actions$.next(action);
  }

  select<T>(selector: (s: State) => T): Observable<T> {
    return this._state$.pipe(map(selector), distinctUntilChanged());
  }

  private setState(state: State) {
    this._state$.next(state);
  }
}
