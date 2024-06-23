import { createAction, props } from '@ngrx/store';
import { Card } from "../../services/card.service";

export const setSearchQuery = createAction(
  '[Search] Set Search Query',
  props<{ query: string }>()
);

export const setSearchResults = createAction(
  '[Search] Set Search Results',
  props<{ results: Card[] }>()
);
