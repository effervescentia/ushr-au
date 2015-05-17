import {
  computedFrom
}
from 'aurelia-framework';
/*import {HttpClient} from 'aurelia-http-client';*/

/*@inject(HttpClient)*/
export class Welcome {
  heading = 'Discover theater in';

  /*constructor(http) {
    this.http = http;
  }*/

  /*@computedFrom('firstName', 'lastName')
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  welcome(){
    alert(`Welcome, ${this.fullName}!`);
  }*/

}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}