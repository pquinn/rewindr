jQuery(function() {  
  var width  = $("#canvas").width();
  var height = $("#canvas").height();
  var xTiles = 10;
  var tileSize =  width / xTiles;

  var canScroll = true;
  
  var dimensions = GetTiles();
  var numberOfTilesPerPage = dimensions.x * dimensions.y;

  $(".scroll-hover").hover(
    function () {
      $(".scroll").attr("visibility", "visible");
    });

  $("#leftScroll").click(function ()  { 
    if (canScroll) {
    } 
  });
  $("#rightScroll").click(function () { 
    if (canScroll) {
      getTracks("1329026400", "1329112800", transitionAndAddTilesToWall);
    }
  });
  
  getTracks(null, null, addTilesToWall);

  function getTracks(from, to, callback) {
    $.ajax('/tracks', {
      data: {
        'user_name': gon.user_name,
        'limit': numberOfTilesPerPage,
        'from': from,
        'to': to
      },
      success: callback,
      error: function() {
        alert('noo')
      },
      dataType: 'json'
    });
  }
  
  function addTilesToWall(data) {
    var tiles = d3.select("svg").selectAll("image")
        .data(data, function(d) { return parseInt(d.date.uts); });
        
    tiles.enter().append("image")
      .attr("class", "enter")
      .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize; })
      .attr("y", function (_, i) { return  (i % dimensions.y) * tileSize; })
      .attr("width", tileSize)
      .attr("height", tileSize)
      .attr("xlink:href", function (d) { return d.image[2]["content"] || "http://img.pokemondb.net/artwork/unown.jpg"; });
  }
  
  function transitionAndAddTilesToWall(data) {
    var tiles = d3.select("svg").selectAll("image")
        .data(data, function(d) { return parseInt(d.date.uts); });
        
    canScroll = false;
    tiles.enter().append("image")
      .attr("class", "enter")            
      .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize - width * 1; })
      .attr("y", function (_, i) { return (i % dimensions.y) * tileSize; })
      .attr("width", tileSize)
      .attr("height", tileSize)
      .attr("xlink:href", function (d) { return d.image[2]["content"] || "http://img.pokemondb.net/artwork/unown.jpg"; })

      .transition().duration(2000)

      .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize; })
      .each("end", function() { canScroll = true; });

    tiles.exit()
      .attr("class", "exit")
      .transition().duration(2000)
      .attr("x", function(d, i) { return Math.floor(i / dimensions.y) * tileSize + width * 1; })
      .remove();
  }

  function GetTiles() {
    return {
      "x": xTiles,
      "y": Math.floor(height / tileSize) 
    };
  }
});