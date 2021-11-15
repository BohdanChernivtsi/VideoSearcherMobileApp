import { BehaviorSubject } from "rxjs";

export let isLoading$ = new BehaviorSubject(false);

export function getResults() {
    // isLoading$.next(true)

}