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
    this.imageUrl = this.images[0];
    // this.nextStyleObject = {
    //   'background-image': `url(${this.images[3]})`,
    //   'z-index': 1
    // };
    this.styleObject = {
      'z-index': 2,
      'background-image': `url(${this.images[0]})`
      // '-webkit-animation': 'wipe 2s linear'
    };
    // setTimeout(function(jumbosearch) {
    //   jumbosearch.styleObject = {
    //     'background-image': `url(${jumbosearch.images[3]})`,
    //     '-webkit-clip-path': 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)',
    //     'z-index': 2
    //   };
    // }, 2000, this);
  }
}
