$ ->  
  opts = 
    lines: 13
    length: 7
    width: 6
    radius: 15
    corners: 1
    rotate: 0
    color: '#000'
    speed: 1
    trail: 60
    shadow: false
    hwaccel: false
    className: 'spinner'
    zIndex: 2e9
    top: 'auto'
    left: 'auto'
  
  target = document.getElementById('spinner-location')
  spinner = new Spinner(opts)

  $(document).on
    ajaxStart: ->
      $(target).show();
      spinner.spin(target);
    ajaxStop: ->
      $(target).hide();
      spinner.stop();