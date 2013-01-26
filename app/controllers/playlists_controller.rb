class PlaylistsController < ApplicationController
  respond_to :json
  
  def show
    respond_with lastfm
  end
  
  private
  
  def lastfm
    LASTFM.user.get_recent_tracks(
      :user => params[:username], 
      :from => 1.year.ago.to_i, 
      :to => (1.year.ago + 1.day).to_i
    )
  end
end
