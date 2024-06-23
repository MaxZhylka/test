import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CardsState } from '../reducers/card.reducer';

export const selectCardsState = createFeatureSelector<CardsState>('cards');

export const selectSearchQuery = createSelector(
  selectCardsState,
  (state: CardsState) => state.query
);
