import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RickService, RickCharacter } from './rick.service';

@Injectable({ providedIn: 'root' })
export class RickResolver implements Resolve<RickCharacter | null> {
  constructor(private rick: RickService) {}

  resolve(): Observable<RickCharacter | null> {
    return this.rick.getRandomCharacter().pipe(
      catchError(() => of(null))
    );
  }
}
