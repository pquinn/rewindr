Rewindr.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'index',
    "playlist/:userName" : "playlist"
  },

  index: function() {
     var view = new Rewindr.Views.MainIndex()
     $('#container').html(view.render().el);
     
    // Try to focus the input

    var el = document.getElementById("input-huge");

    if (el) {
      el.focus();
    }
  },

  playlist: function(userName) {
  	var tracks = new Rewindr.Collections.Tracks({"user" : userName});

  	tracks.fetch({
  		"success" : function(collection, response, options) {
  			var view = new Rewindr.Views.TracksIndex({"tracks" : collection, "user" : userName});
  			var rendered = view.render().el;
        $('#container').html(rendered);			
  		},
  		"error" : function() {
  			$("container").html("There was an error.")
  		}
  	});
  }
});
