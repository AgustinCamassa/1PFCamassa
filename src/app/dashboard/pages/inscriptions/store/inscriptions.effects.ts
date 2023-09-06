import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';

@Injectable()
export class InscriptionsEffects {


  loadInscriptionss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptions),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
