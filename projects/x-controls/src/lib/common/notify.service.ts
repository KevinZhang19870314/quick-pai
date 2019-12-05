import { Subject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NotifyService {
    protected _notifySubject = new Subject<Event>();

    constructor() { }

    public notify(key: string, value: any) {
        this._notifySubject.next({ key, value });
    }

    public get(key: string): Observable<any> {
        return this._notifySubject.asObservable()
            .pipe(
                filter(e => e.key === key),
                map(e => e.value)
            );
    }
}

interface Event { 
    key: string;
    value: any;
}

export const TAB_xVisible = 'TAB_xVisible';