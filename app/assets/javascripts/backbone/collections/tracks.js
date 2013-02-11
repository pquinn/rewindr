Rewindr.Collections.Tracks = Backbone.Collection.extend({

  model: Rewindr.Models.Track,

  initialize: function(args) {
  	this.url = "playlists/" + args.user;
  }

});
