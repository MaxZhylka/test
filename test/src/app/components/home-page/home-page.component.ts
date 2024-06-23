import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subscription} from 'rxjs';
import { select, Store } from '@ngrx/store';
import {CardsState, CardState} from '../../store/reducers/card.reducer';
import { loadCards } from '../../store/actions/card.actions';
import { Card } from '../../services/card.service';
import {FormControl} from "@angular/forms";
import {query} from "@angular/animations";
import {setSearchQuery} from "../../store/actions/search.actions";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit,OnDestroy {
  @ViewChild('input') input!: ElementRef;

  cards$!: Observable<Card[]>;
  searchControl = new FormControl('');
  count: number = 6;
  subscription!:Subscription;
  constructor(private store: Store<{ cards: CardsState }>) {
    this.cards$ = store.pipe(select(state => state.cards.filteredCards));
  }

    onContainerClick(event: MouseEvent): void {
    // for Safari, in mobile version this browser did not drop focus
    const clickedInside = this.input.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.input.nativeElement.blur();
    }
  }
  ngOnInit() {
   this.store.dispatch(loadCards());

   this.subscription=this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe({next:(query)=> {
      if(query==null) {
        const  empty:string="";
        this.store.dispatch(setSearchQuery({query:empty}))
      }
      else
      {
         this.store.dispatch(setSearchQuery({query}))
      }
     }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  focusInput(event: MouseEvent) {
      this.input.nativeElement.focus();
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
  }
}
