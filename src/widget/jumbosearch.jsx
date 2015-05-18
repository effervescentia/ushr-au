import {customElement, inject, bindable, computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import JSONSelect from 'jsonselect';

var _url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgsz=xxlarge&q=';

@customElement('jumbosearch')
@inject(HttpClient)
export class JumboSearch {
  label = 'Discover theater in';

  constructor(http) {
    this.http = http;
  }

  callback(query) {
    if (query && query.length > 0) {
      var ref = this;
      var searchString = query.replace(',', '');
      return this.http.createRequest(_url + searchString)
        .asJsonp()
        .withCallbackParameterName('callback')
        .send()
        .then(response => this.updateStyle(response));
    }
  }

  updateStyle(response) {
    this.images = JSONSelect.match('.responseData .results .url', response.content);
    this.styleObject = {
      'background-image': `url(${this.images[0]})`
    };
  }
}
