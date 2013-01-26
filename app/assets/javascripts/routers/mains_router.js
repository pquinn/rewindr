Rewindr.Routers.Mains = Backbone.Router.extend({
  routes: {
    '': 'index',
    "playlist/:userName" : "playlist"
  },

  index: function() {
     var view = new Rewindr.Views.MainsIndex()
     $('#container').html(view.render().el);
     
    // Try to focus the input

    var el = document.getElementById("input-huge");

    if (el) {
      el.focus();
    }
  },

  playlist: function(userName) {
  	var tracks = new Rewindr.Collections.Tracks();

  	tracks.fetch({
      "data" : {"user_name" : userName, "page" : 1},
  		"success" : function(collection, response, options) {
  			var view = new Rewindr.Views.TracksIndex({"tracks" : collection, "user" : userName});
        debugger;
  			var rendered = view.render().el;
        $('#container').html(rendered);			
  		},
  		"error" : function() {
  			$("container").html("There was an error.")
  		}
  	});
  }
});
