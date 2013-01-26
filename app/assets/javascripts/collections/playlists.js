Rewindr.Collections.Playlists = Backbone.Collection.extend({

  model: Rewindr.Models.Playlist,

  initialize: function() {
  	this.url = "/playlist";
  },

});
