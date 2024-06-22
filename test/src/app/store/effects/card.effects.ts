
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardService } from '../../services/card.service';
import { loadCards, loadCardsSuccess, loadCardsFailure } from '../actions/card.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CardEffects {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      mergeMap(() =>
        this.cardService.getCards().pipe(
          map(cards => loadCardsSuccess({ cards })),
          catchError(error => of(loadCardsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cardService: CardService
  ) {}
}
