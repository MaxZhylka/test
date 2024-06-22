import {createAction, props} from "@ngrx/store";
import {Card} from "../../services/card.service";


export const loadCards=createAction('[Card] Load Cards');
export const loadCardsSuccess= createAction(
  '[Card} Load Cards Success',
  props<{cards:Card[]}>()
);
export const loadCardsFailure = createAction(
  '[Card] Load Cards Failure',
  props<{ error: any }>()
);
