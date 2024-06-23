import {createAction, props} from "@ngrx/store";
import {Card} from "../../services/card.service";
import {CardState} from "../reducers/card.reducer";


export const loadCards=createAction('[Card] Load Cards');
export const loadCardsSuccess= createAction(
  '[Card} Load Cards Success',
  props<{cards:Card[]}>()
);
export const loadCardsFailure = createAction(
  '[Card] Load Cards Failure',
  props<{ error: any }>()
);

export const selectCard = createAction('[Card] Select Card',
  props<{id:number}>()
  );
export const loadCardData =createAction('[Card] Load One Card Data',
  props<{id:number}>())
export const loadCardSuccess= createAction(
  '[Card} Load Card Success',
  props<{card:Card}>()
);
export const loadCardFailure = createAction(
  '[Card] Load Card Failure',
  props<{ error: any }>()
);
