Rewindr.Routers.Mains = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function() {
     var view = new Rewindr.Views.MainsIndex()
     $('#container').html(view.render().el)
  }
});
