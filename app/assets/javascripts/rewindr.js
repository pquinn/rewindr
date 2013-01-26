window.Rewindr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Rewindr.Routers.Mains
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Rewindr.initialize();
});
