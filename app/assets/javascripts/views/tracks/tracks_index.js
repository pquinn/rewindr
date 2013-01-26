Rewindr.Views.TracksIndex = Backbone.View.extend({

  template: JST['playlists/index'],

  initialize: function() {
  	this.collection = this.options["tracks"];
  },

  render: function() {
    $(this.el).html(this.template);
    var self = this;
    this.collection.each(function(model) {
      var view = new Rewindr.Views.TrackListItem({"model" : model});
      var el = view.render().el;
      $(self.el).children().children().append(el);
    });
  	return this;
  }

});
