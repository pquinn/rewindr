Rewindr.Collections.Tracks = Backbone.Collection.extend({

  model: Rewindr.Models.Track,

  initialize: function() {
  	this.url = "tracks";
  }

});
