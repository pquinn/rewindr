Rewindr.Views.TrackListItem = Backbone.View.extend({

  template: HoganTemplates['backbone/templates/tracks/track'],

  render: function() {

    var color = this.options["even-odd"] % 2 == 0 ? "even" : "odd";

    var rendered = this.template.render(_.extend(this.model.attributes, {"color" : color}));

    $(this.el).html(rendered);
    return this;
  }

});