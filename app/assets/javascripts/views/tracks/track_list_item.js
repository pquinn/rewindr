Rewindr.Views.TrackListItem = Backbone.View.extend({

  template: JST['tracks/index'],

  render: function() {

    var date = new Date(this.model.attributes.date.content);
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var dateString = date.getHours() < 12 ?
      date.getHours() + ":" + minutes + " am":
      (date.getHours() - 12) + ":" + minutes + " pm";

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
          console.log(data)
          $('#api').rdio().play(data.rdio_song_id);
        },
        error: function() {
          alert('SHIT')
        }
      });
      $(iconPlay).toggleClass("icon-pause");
    });

    iconStop.click(function() {
    });

    $(this.el).html(rendered);
    return this;
  }

});