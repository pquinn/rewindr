Rewindr.Views.TracksIndex = Backbone.View.extend({

  template: JST['playlists/index'],

  initialize: function() {
  	this.collection = this.options["tracks"];
    this.userName = this.options["user"];
  },

  render: function() {
    if (this.collection.models.length === 10) {
      $(this.el).children().children().append("<div>no songs</div>");
      return this;
    }
    
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

    $(this.el).html(this.template({"dateString" : dateString}));
    var self = this;
    this.collection.each(function(model) {
      var view = new Rewindr.Views.TrackListItem({"model" : model});
      var el = view.render().el;
      $(self.el).children().children().append(el);
      $(self.el).children().children().append($("<hr>"));
    });

    if (this.collection.models.length === 10) {
      var button = $("<button id='show-more' class='btn' type='button'>Show more</button>");
      button.click(function() {self.clickHandler(self)});
      $(this.el).children().children().append(button);
    }
  	return this;
  },
  
});
