class TestController < ApplicationController
  def index
    gon.track_data = lastfm
  end
end
