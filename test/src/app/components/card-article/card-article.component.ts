import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Card} from "../../services/card.service";
import {select, Store} from "@ngrx/store";
import {CardState} from "../../store/reducers/card.reducer";
import {loadCardData} from "../../store/actions/card.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";


@Component({
  selector: 'app-card-article',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './card-article.component.html',
  styleUrl: './card-article.component.scss'
})
export class CardArticleComponent implements OnInit{

  card$!:Observable<Card|null>;

  constructor(private router:Router, private route:ActivatedRoute,private  store: Store<{oneCard: CardState}>)
  {
    this.card$=store.pipe(select(state=>state.oneCard.card));
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      const path = segments.map(segment => segment.path).join('/');
      const match = path.match(/(\d+)$/);
      if (match) {
        const id = +match[0];

        if (id) {
          this.store.dispatch(loadCardData({ id }));
        }
      }
    });
  }
  back()
  {
    this.router.navigate(['']);
  }


}
