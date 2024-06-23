import { createReducer, on } from '@ngrx/store';
import {
  loadCards,
  loadCardsSuccess,
  loadCardsFailure,
  loadCardData,
  loadCardSuccess,
  loadCardFailure
} from '../actions/card.actions';
import {Card} from "../../services/card.service";
import {setSearchQuery, setSearchResults} from "../actions/search.actions";


export interface CardsState {
  cards: Card[];
  error: any;
  query: string;
  filteredCards: Card[];
}

export const initialState: CardsState = {
  cards: [],
  error: null,
  query: '',
  filteredCards: []
};


export interface CardState {
  card: Card|null;
  error: any;
}
export const initOneCard:CardState=
  {
    card:null,
    error:null
  }
export const cardReducer = createReducer(
  initialState,
  on(loadCards, state => ({ ...state, cards: [] })),
  on(loadCardsSuccess, (state, { cards }) => ({ ...state, cards, filteredCards: cards })),
  on(loadCardsFailure, (state, { error }) => ({ ...state, error })),
  on(setSearchQuery, (state, { query }) => ({ ...state, query })),
  on(setSearchResults, (state, { results }) => ({ ...state, filteredCards: results }))
);
export const oneCardReducer=createReducer(
  initOneCard,
  on(loadCardData,state=>({...state,card:null})),
  on(loadCardSuccess, (state, { card }) => ({ ...state, card })),
  on(loadCardFailure, (state, { error }) => ({ ...state, error }))
)

