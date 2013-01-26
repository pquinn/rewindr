class TestController < ApplicationController
  def index
    gon.track_data = lastfm
    # render :text => lastfm.to_json
  end
end
