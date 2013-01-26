class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def lastfm
    LASTFM.user.get_recent_tracks(
      :user => params[:user_name], 
      :from => params[:from] || 365.days.ago.to_i,
      :to   => params[:to]   || 364.days.ago.to_i,
      :page => params[:page],
      :limit => 200
    )
  end
end
