import {customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';
import JSONSelect from 'jsonselect';

@customElement('search')
@inject(HttpClient, EventAggregator)
export class Search {
  updatable = true;
  suggest = '...';
  placeholder = 'Enter your city';
  url = 'http://localhost:8000/locations?query=';

  constructor(http, aggregator) {
    this.http = http;
    this.aggregator = aggregator;
  }

  search() {
    alert(`Searching for ${this.query}`);
  }

  update() {
    if (this.updatable && this.query.trim().length > 0) {
      return this.http.jsonp(this.url + this.query).then(response => {
        try {
          this.autocomplete = JSONSelect.match('.predictions .description', response.content[0]);
          var details = this.autocomplete[0].split(',');
          var relevant = details.slice(0, details.length - 1);
          this.suggest = relevant.join(", ");
          this.aggregator.publish('search_suggest', details);
        } catch (e) {
          this.updatable = false;
          console.log('Update failed, waiting to avoid spam updates');
          setTimeout(function(search) {search.updatable = true;}, 500, this);
        }
      });
    }
  }
}
