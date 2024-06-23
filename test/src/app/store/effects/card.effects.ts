
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardService } from '../../services/card.service';
import {tap, withLatestFrom} from 'rxjs/operators';
import {
  loadCards,
  loadCardsSuccess,
  loadCardsFailure,
  loadCardData,
  loadCardSuccess,
  loadCardFailure, selectCard,
} from '../actions/card.actions';
import {setSearchQuery, setSearchResults} from "../actions/search.actions";
import { catchError, map, mergeMap,switchMap } from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {Router} from "@angular/router";
import {Action, Store} from "@ngrx/store";
import {CardsState} from "../reducers/card.reducer";

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
  loadCard$= createEffect(()=>this.actions$.pipe(
    ofType(loadCardData),mergeMap((action)=> this.cardService.getCard(action.id).pipe(
      map(card=>loadCardSuccess({card})),
      catchError(error=>of(loadCardFailure({error})))
    ))
  ))
 selectCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectCard),
      tap(action => this.router.navigate([`/article/${action.id}`])),
      map(() => EMPTY)
    ),
    { dispatch: false }
  );

   search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSearchQuery),
      withLatestFrom(this.store.select(state => state.cards.cards)),
      switchMap(([action, cards]) => {
        const query = action.query.trim().toLowerCase();
        const queryWords = query.split(' ');

        if (!query) {
          return of(setSearchResults({ results: cards }));
        } else {
          const filteredCards = cards
            .filter(card =>
              queryWords.some(word =>
                card.title.toLowerCase().includes(word) ||
                card.summary.toLowerCase().includes(word)
              )
            )
            .map(card => {
              const titleMatches = queryWords.reduce((count, word) => count + this.countOccurrences(card.title, word), 0);
              const summaryMatches = queryWords.reduce((count, word) => count + this.countOccurrences(card.summary, word), 0);
              return { ...card, matches: titleMatches * 2 + summaryMatches };
            })
            .sort((a, b) => b.matches - a.matches);

          return of(setSearchResults({ results: filteredCards }));
        }
      }),
      catchError(error => of({ type: '[Search] Search Cards Failure', error } as Action))
    )
  );

  private countOccurrences(text: string, word: string): number {
    return text.toLowerCase().split(word).length - 1;
  }
  constructor(
    private actions$: Actions,
    private cardService: CardService,
    private router:Router,
    private store:Store<{ cards: CardsState }>
  ) {}
}
