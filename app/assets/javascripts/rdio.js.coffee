$ ->
  $(document).on 'click', ".play-button", ->
    console.log('loading song')
    $('#api').rdio().play('a171827')
    console.log('done!')
    
  $('#api').rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=')