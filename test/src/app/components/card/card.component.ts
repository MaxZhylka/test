import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Card} from "../../services/card.service";
import {Store} from "@ngrx/store";
import {selectCard} from "../../store/actions/card.actions";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements  AfterViewInit{
  @ViewChild('description', { static: false }) descriptionElement!: ElementRef;
  @Input() articleData!:Card;
    ngAfterViewInit() {

  }
  constructor(private store:Store) {
  }
  convertedTime()
  {
      const date = new Date(this.articleData.updated_at);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${day}th, ${year}`;
  }
adjustTextOverflow() {
    return this.articleData.summary.slice(0,100)+'...';
  }

openArticle()
{
  const id=this.articleData.id;
  this.store.dispatch(selectCard({id}));
}
}
