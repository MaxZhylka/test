import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from '../store/selectors/card.selectors';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'highlight', pure: false })
export class HighlightPipe implements PipeTransform {
  private searchQuery: string = '';

  constructor(private store: Store, private sanitizer: DomSanitizer) {
    this.store.select(selectSearchQuery).subscribe(query => {
      this.searchQuery = query;
    });
  }

  transform(text: string): SafeHtml {
    if (!this.searchQuery) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    const queryWords = this.searchQuery.split(' ').filter(word => word.length > 0);
    const regex = new RegExp(`(${queryWords.join('|')})`, 'gi');
    const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
