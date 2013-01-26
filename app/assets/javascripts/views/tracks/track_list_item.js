Rewindr.Views.TrackListItem = Backbone.View.extend({

  template: JST['tracks/index'],

  render: function() {
    var rendered = this.template(this.model.attributes);
    $(this.el).html(rendered);
    return this;
  }

});