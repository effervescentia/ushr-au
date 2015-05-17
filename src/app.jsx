import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'USHR';
    config.map([
      { route: ['','home'],  moduleId: './home',      nav: true, title:'Home' }
      // { route: 'flickr',        moduleId: './theaters',     nav: true, title:'Theaters' },
      // { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
