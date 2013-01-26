Rewindr.Views.TracksIndex = Backbone.View.extend({

  template: JST['tracks/index'],

  initialize: function() {
  	this.collection = this.options["tracks"];
  },

  render: function() {
  	$(this.el).html(this.template());
  	return this;
  }

});
