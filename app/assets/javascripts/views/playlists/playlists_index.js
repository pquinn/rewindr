Rewindr.Views.PlaylistsIndex = Backbone.View.extend({

  template: JST['playlists/index'],

  render: function() {
  	$(this.el).html(this.template({}));
  	return this;
  }

});
