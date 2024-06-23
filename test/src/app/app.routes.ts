import { Routes } from '@angular/router';
import {CardArticleComponent} from "./components/card-article/card-article.component";
import {HomePageComponent} from "./components/home-page/home-page.component";



export const routes: Routes = [
  {path:'',component: HomePageComponent},
{ path: 'article/:id', component: CardArticleComponent }
];
