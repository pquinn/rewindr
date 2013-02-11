Rewindr.Views.TracksIndex = Backbone.View.extend({

  template: HoganTemplates['backbone/templates/tracks/tracks'],

  initialize: function() {
    this.collection = this.options["tracks"];
    this.userName = this.options["user"];
  },

  render: function() {
    var months = {
      0: "January",
      1 : "February",
      2 : "March",
      3 : "April",
      4 : "May",
      5 : "June",
      6 : "July",
      7 : "August",
      8 : "September",
      9 : "October",
      10 : "November",
      11 : "December"
    };
    var date = new Date();
    var dateString = months[date.getMonth()] + " " + date.getDate() + ", " + (date.getFullYear() - 1);

    $(this.el).html(this.template.render({"dateString" : dateString}));
    var self = this;
    var even_odd = 0;
    this.collection.each(function(model) {
      var view = new Rewindr.Views.TrackListItem({"model" : model, "even-odd" : even_odd});
      var el = view.render().el;
      debugger;
      $($(self.el).children()[0]).append(el);
      even_odd++;
    });

    return this;
  },

});