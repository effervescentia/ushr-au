'use strict';

var _homePoJs = require('./home.po.js');

var _skeletonPoJs = require('./skeleton.po.js');

describe('ushr aurelia app', function () {
  var po_home, po_skeleton;

  beforeEach(function () {
    po_skeleton = new _skeletonPoJs.PageObject_Skeleton();
    po_home = new _homePoJs.PageObject_Home();

    browser.loadAndWaitForAureliaPage('http://localhost:9000');
  });

  it('should load the page and display the initial page title', function () {
    expect(po_skeleton.getCurrentPageTitle()).toContain('USHR');
  });

  /*it('should display greeting', () => {
    expect(po_home.getGreeting()).toBe('Welcome to the Aurelia Navigation App!');
  });*/

  /*it('should automatically write down the fullname', () => {
    po_welcome.setFirstname('Rob');
    po_welcome.setLastname('Eisenberg');
     // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(po_welcome.getFullname()).toBe('ROB EISENBERG');
  });*/

  /*it('should show alert message when clicking submit button', () => {
    expect(po_home.openAlertDialog()).toBe(true);
  });*/

  /*it('should navigate to flickr page', () => {
    po_skeleton.navigateTo('#/flickr');
    expect(po_skeleton.getCurrentPageTitle()).toBe('Flickr | Aurelia');
  });*/
});