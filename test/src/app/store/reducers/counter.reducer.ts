// card.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadCards, loadCardsSuccess, loadCardsFailure } from '../actions/card.actions';
import {Card} from "../../services/card.service";


export interface CardState {
  cards: Card[];
  error: any;
}

export const initialState: CardState = {
  cards: [],
  error: null
};

export const cardReducer = createReducer(
  initialState,
  on(loadCards, state => ({ ...state, cards: [] })),
  on(loadCardsSuccess, (state, { cards }) => ({ ...state, cards })),
  on(loadCardsFailure, (state, { error }) => ({ ...state, error }))
);
