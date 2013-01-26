Rewindr.Views.PlaylistView = Backbone.View.extend({

  el: "div",

  template: JST['playlist/index'],

  initialize: function() {
    this.collection = this.options["tracks"];
  },

  render: function() {
    //$(this.el).html(this.template());
    //debugger;
    this.collection.each(function(model) {
      var view = new Rewindr.Views.TrackListItem({"model" : model});
      var el = view.render();
      $(this.el).append(el);
    });
    return this;
  }

});
