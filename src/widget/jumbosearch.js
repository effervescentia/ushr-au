import {customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';
import JSONSelect from 'jsonselect';

@customElement('jumbosearch')
@inject(HttpClient, EventAggregator)
export class JumboSearch {
  label = 'Discover theater in';
  key = '9d969b3eaf2f1d6f11a9ba70e215addf';
  url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.key + '&tagmode=any&format=json&tags=';
  imageUrl = 'http://feelgrafix.com/data_images/out/10/835799-jungle-pictures.jpg';

  constructor(http, aggregator) {
    this.http = http;
    this.aggregator = aggregator;
    this.subscribe();
  }

  subscribe() {
    this.aggregator.subscribe('search_suggest', payload => {
      console.log('picked up', payload);
      console.log('searching for', this.url + payload[0]);
      return this.http.jsonp(this.url + payload[0]).then(response => {
        console.log(response.content);
        this.images = response.content.photos.photo;
        var image = this.images[0];
        this.imageUrl = 'https://farm' + image.farm + '.staticflickr.com/' +
          image.server + '/' + image.id + '_' + image.secret + '_b.jpg';
      });
    });
  }
}
