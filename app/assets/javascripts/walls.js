jQuery(function() {  
  var width  = $("#canvas").width();
  var height = $("#canvas").height();
  var xTiles = 10;
  var tileSize =  width / xTiles;

  var canScroll = true;
  
  var dimensions = GetTiles();
  var numberOfTilesPerPage = dimensions.x * dimensions.y;
  
  var from = gon.from_time
  var to   = gon.to_time
  
  function addWeek() {
    from = (from + 604800)
    to   = (to + 604800)
  }
  
  function subtractWeek() {
    from = (from - 604800)
    to   = (to - 604800)
  }

  $("#leftScroll").click(function ()  { 
    if (canScroll) {
      addWeek();
      getTracks(function(data) { transitionAndAddTilesToWall(data, 1) });
    } 
  });
  $("#rightScroll").click(function () { 
    if (canScroll) {
      subtractWeek();
      getTracks(function(data) { transitionAndAddTilesToWall(data, -1) });
    }
  });
  
  getTracks(addTilesToWall);

  function getTracks(callback) {
    $.ajax('/playlists/' + gon.user_name, {
      data: {
        'limit': numberOfTilesPerPage,
        'from': from,
        'to': to
      },
      success: callback,
      error: function(error) {
        console.log(error);
        alert('noo');
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
      .attr("y", function (_, i) { return  (i % dimensions.y) * tileSize - height; })
      .attr("width", tileSize)
      .attr("height", tileSize)
      .attr("xlink:href", function (d) { return d.image[2]["content"] || "http://img.pokemondb.net/artwork/unown.jpg"; })
      .popover(function(d,i){
                  var svg = d3.select(document.createElement("svg")).attr("height", 70);
                  var tile = d3.select(this);
                  var g = svg.append("g");
                  g.append("text").text("Artist: " + d.artist["content"]).attr("dy", "40").attr("y", "-20");
                  g.append("text").text("Album: " + d.album["content"]).attr("dy", "40").attr("y", "0");
                  g.append("text").text("Date: " + d.date["content"]).attr("dy", "40").attr("y", "20");
                  return {      
                      // The title that will be displayed on the popover
                      title: d.name ,
                      //A d3 svg element
                      content: svg,
                      placement: "fixed",
                      gravity: "right", 
                      position: [Math.floor(i / dimensions.y) * tileSize, (i % dimensions.y) * tileSize],
                      displacement: [- tileSize / 2, tileSize],            
                      mousemove: false,
                      mouseover: function (d, i) {
                          tile.transition().duration(200)
                              .attr("width", tileSize*1.2)
                              .attr("height", tileSize*1.2);
                      },
                      mouseout: function (d, i) {
                          tile.transition().duration(200)
                              .attr("width", tileSize)
                              .attr("height", tileSize);
                      },
                      click: selectTrack
                  };
              })
              .transition().duration(750).delay(function (d, i) { return i * 15; })
                  .attr("y", function (_, i) { return  (i % dimensions.y) * tileSize; });
  }
  
  function transitionAndAddTilesToWall(data, direction) {
    var tiles = d3.select("svg").selectAll("image")
        .data(data, function(d) { return parseInt(d.date.uts); });
        
    canScroll = false;
    tiles.enter().append("image")
      .attr("class", "enter")            
      .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize - width * direction; })
      .attr("y", function (_, i) { return (i % dimensions.y) * tileSize; })
      .attr("width", tileSize)
      .attr("height", tileSize)
      .attr("xlink:href", function (d) { return d.image[2]["content"] || "http://img.pokemondb.net/artwork/unown.jpg"; })
      .popover(function(d,i){
                  var svg = d3.select(document.createElement("svg")).attr("height", 70);
                  var tile = d3.select(this);
                  var g = svg.append("g");
                  g.append("text").text("Artist: " + d.artist["content"]).attr("dy", "40").attr("y", "-20");
                  g.append("text").text("Album: " + d.album["content"]).attr("dy", "40").attr("y", "0");
                  g.append("text").text("Date: " + d.date["content"]).attr("dy", "40").attr("y", "20");
                  return {
                      // The title that will be displayed on the popover
                      title: d.name ,
                      //A d3 svg element
                      content: svg,
                      placement: "fixed",
                      gravity: "right", 
                      position: [Math.floor(i / dimensions.y) * tileSize, (i % dimensions.y) * tileSize],
                      displacement: [- tileSize / 2, tileSize],            
                      mousemove: false,
                      mouseover: function (d, i) {
                          tile.transition().duration(200)
                              .attr("width", tileSize*1.2)
                              .attr("height", tileSize*1.2);
                      },
                      mouseout: function (d, i) {
                          tile.transition().duration(200)
                              .attr("width", tileSize)
                              .attr("height", tileSize);
                      },
                      click: selectTrack
                  };
              })

      .transition().duration(750)
      .attr("x", function (_, i) { return Math.floor(i / dimensions.y) * tileSize; })
      .each("end", function() { canScroll = true; });

    tiles.exit()
      .attr("class", "exit")
      .transition().duration(750)
      .attr("x", function(d, i) { return Math.floor(i / dimensions.y) * tileSize + width * direction; })
      .remove();
  }
  
  function selectTrack(d, i) {
    $('#test_modal').modal()
    
    $("#modal-image").attr('src', d['image'][2]['content'])
    $("#modal-name").html(d['name'])
    $("#modal-album").html(d['album']['content'])
    $("#modal-artist").html(d['artist']['content'])
  }

  function GetTiles() {
    return {
      "x": xTiles,
      "y": Math.floor(height / tileSize) 
    };
  }
});