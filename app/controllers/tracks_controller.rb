class TracksController < ApplicationController
  respond_to :json
  
  def index
    respond_with lastfm
  end
  
  private
  
  def lastfm
    LASTFM.user.get_recent_tracks(
      :user => params[:user_name], 
      :from => params[:from] || 365.days.ago.to_i,
      :to   => params[:to]   || 364.days.ago.to_i,
      :page => params[:page]
    )
  end
end
