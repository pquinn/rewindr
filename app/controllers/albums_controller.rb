class AlbumsController < ApplicationController
  respond_to :json
  
  def index
    respond_with lastfm
  end
end
