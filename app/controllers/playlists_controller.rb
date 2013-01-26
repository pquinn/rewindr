class PlaylistsController < ApplicationController
  respond_to :json
  
  def show
    respond_with lastfm
  end
  
  private
  
  def lastfm
    LASTFM.user.get_recent_tracks(
      :user => params[:username], 
      :from => params[:from] || 365.days.ago.to_i,
      :to   => params[:to]   || 364.days.ago.to_i,
      :page => params[:page]
    )
  end
end
