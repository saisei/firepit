App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

App.ApplicationController = Ember.Controller.extend();

App.AllContributorsController = Ember.ArrayController.extend();
App.AllContributorsView = Ember.View.extend({
  templateName: 'contributors'
});

App.Contributor = Ember.Object.extend();
App.Contributor.reopenClass({
	allContributors: [],
	find: function() {
		$.ajax({
      url: 'https://api.github.com/repos/emberjs/ember.js/contributors',
      dataType: 'jsonp',
      context: this,
      success: function(response){
				response.data.forEach(function(contributor) {
					this.allContributors.addObject(App.Contributor.create(contributor))
				}, this)
      }
    })
		return this.allContributors
	}
});

App.Router = Ember.Router.extend({
	enableLogging: true,
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
			connectOutlets: function(router){
    		router.get('applicationController').connectOutlet('allContributors', App.Contributor.find());
  		}
    }),
  })
});

App.initialize();
