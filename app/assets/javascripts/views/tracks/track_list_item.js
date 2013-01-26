Rewindr.Views.TrackListItem = Backbone.View.extend({

  template: JST['tracks/index'],

  render: function() {
    var rendered = $(this.template(this.model.attributes));
    debugger;

    var iconPlay = rendered.children().children(".icon-play");
    var iconStop = rendered.children().children(".icon-stop");

    iconPlay.click(function() {
    	$(iconPlay).toggleClass("icon-play");
    	$(iconPlay).toggleClass("icon-pause");
    });

    iconStop.click(function() {
    });

    $(this.el).html(rendered);
    return this;
  }

});