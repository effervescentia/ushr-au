import {customElement, inject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import JSONSelect from 'jsonselect';

var _url = '/locations?query=';

// @exclude
// DEV ONLY
_url = 'http://localhost:8000' + _url;
// @endexclude

@customElement('search')
@inject(HttpClient)
export class Search {
  @bindable cbobject;
  updatable = true;
  suggest = '...';
  placeholder = 'Enter your city';

  constructor(http) {
    this.http = http;
  }

  search() {
    alert(`Searching for ${this.query}`);
  }

  update() {
    if (this.updatable && this.query.trim().length > 0) {
      return this.http.jsonp(_url + this.query).then(response => {
        try {
          this.autocomplete = JSONSelect.match('.predictions .description', response.content[0]);
          var details = this.autocomplete[0].split(',');
          var relevant = details.slice(0, details.length - 1);
          this.suggest = relevant.join(",");
          if (this.cbobject) {
            this.cbobject.callback(this.suggest);
          }
        } catch (e) {
          this.updatable = false;
          console.log('Update failed, waiting to avoid spam updates');
          setTimeout(function(search) {search.updatable = true;}, 500, this);
        }
      });
    }
  }
}
