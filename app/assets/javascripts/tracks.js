
jQuery(function() {
  $("#modal-image").click(function() {    
    $.ajax("/echonest/rdio_song_id", {
      data: {
        title: $("#modal-name").html(),
        artist: $("#modal-artist").html()
      },
      success: function(data) {
        console.log(data)
        $('#api').rdio().play(data.rdio_song_id);
      },
      error: function() {
        alert('oh my god what have you done this is awful')
      }
    });
  });
})