jQuery(function() {  
  var width  = $("#canvas").width();
  var height = $("#canvas").height();
  var xTiles = 10;
  var tileSize =  width / xTiles;

  var offset = { "x": 0, "y": 0 };
  var index = 0;
  var canScroll = true;
  var data = gon.track_data;

  $(".scroll-hover").hover(
    function () {
      $(".scroll").attr("visibility", "visible");
    });

  $("#leftScroll").click(function ()  { 
    if (canScroll) { 
      index--; 
      DrawTiles(1); 
    } 
  });
  $("#rightScroll").click(function () { 
    if (canScroll) { 
      index++; 
      DrawTiles(-1); 
    }
  });

  DrawTiles(0);

  function GetTiles() {
    return {
      "x": xTiles,
      "y": Math.floor(height / tileSize) 
    };
  }

  function DrawTiles(direction) {
      var dimensions = GetTiles();

      var numberOfTilesPerPage = dimensions.x * dimensions.y;
      
      var currentDataSlice = data.slice(index * numberOfTilesPerPage, (index + 1) * numberOfTilesPerPage);

      var tiles = d3.select("svg").selectAll("image")
          .data(currentDataSlice, function(d) { return parseInt(d.date.uts); });
      
      // avoids animation at start
      if (direction == 0) {
        tiles.enter().append("image")
          .attr("class", "enter")
          .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize; })
          .attr("y", function (_, i) { return  (i % dimensions.y) * tileSize; })
          .attr("width", tileSize)
          .attr("height", tileSize)
          .attr("xlink:href", function (d) { return d.image[2]["content"]; });
      }
      else {        
        canScroll = false;
        tiles.enter().append("image")
          .attr("class", "enter")            
          .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize - width * direction; })
          .attr("y", function (_, i) { return (i % dimensions.y) * tileSize; })
          .attr("width", tileSize)
          .attr("height", tileSize)
          .attr("xlink:href", function (d) { return d.image[2]["#text"]; })
          
          .transition().duration(2000)
          
          .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize; })
          .each("end", function() { canScroll = true; });

        tiles.exit()
          .attr("class", "exit")
          .transition().duration(2000)
          .attr("x", function(d, i) { return Math.floor(i / dimensions.y) * tileSize + width * direction; })
          .remove();
      }
  }
});