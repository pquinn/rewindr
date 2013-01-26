Rewindr.Views.MainsIndex = Backbone.View.extend({

  template: JST['mains/index'],
  
  render: function() {
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
    $(this.el).html(this.template({"date" : dateString}))
    return this
  }

});
