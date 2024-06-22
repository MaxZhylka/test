// card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

export interface Card
{
  id:number,
  title:string,
  image_url:string,
  published_at:string,
  summary:string,
  updated_at:string,
  url:string
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/reports/';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<{results:Card[]}>(this.apiUrl).pipe( map(response=>response.results));
  }
}
