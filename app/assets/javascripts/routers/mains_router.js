Rewindr.Routers.Mains = Backbone.Router.extend({
  routes: {
    '': 'index',
    "playlist/:userName" : "playlist"
  },

  index: function() {
     var view = new Rewindr.Views.MainsIndex()
     $('#container').html(view.render().el);
  },

  playlist: function(userName) {
  	debugger;
  	var view = new Rewindr.Views.PlaylistsIndex();
  	$('#container').html(view.render().el);
  	$('#container').append(userName);
  }
});
