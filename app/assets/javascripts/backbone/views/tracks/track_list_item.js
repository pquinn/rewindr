Rewindr.Views.TrackListItem = Backbone.View.extend({

  template: HoganTemplates['tracks/track'],

  render: function() {

    var color = this.options["even-odd"] % 2 == 0 ? "even" : "odd";

    var rendered = $(this.template(_.extend(this.model.attributes, {"playedTime": dateString})));

    var iconPlay = rendered.children().children(".icon-play");
    var iconStop = rendered.children().children(".icon-stop");
    var songName = rendered.children().children(".media-heading").html();

    iconPlay.click(function() {
      $(iconPlay).toggleClass("icon-play");
      
      var songAndTitle = songName.split(" - ")
      
      $.ajax("/echonest/rdio_song_id", {
        data: {
          title: songAndTitle[0],
          artist: songAndTitle[1]
        },
        success: function(data) {
          $('#api').rdio().play(data.rdio_song_id);
        },
        error: function() {
          alert('oh my god what have you done this is awful')
        }
      });
      $(iconPlay).toggleClass("icon-pause");
    });

    iconStop.click(function() {
    });
    var rendered = this.template.render(_.extend(this.model.attributes, {"color" : color}));

    $(this.el).html(rendered);
    return this;
  }

});