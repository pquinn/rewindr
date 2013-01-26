Rewindr.Views.MainsIndex = Backbone.View.extend({

  template: JST['mains/index'],
  
  render: function() {
    $(this.el).html(this.template())
    return this
  }

});
