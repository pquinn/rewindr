class ApplicationController < ActionController::Base
  protect_from_forgery
  
  private
  
  def lastfm
    @lastfm ||= begin
                  LASTFM.user.get_recent_tracks(
                     :user  => params[:id], 
                     :from  => params[:from] || 365.days.ago.to_i,
                     :to    => params[:to]   || 364.days.ago.to_i,
                     :page  => params[:page],
                     :limit => params[:limit] || 200
                   ) || []
                rescue Lastfm::ApiError
                  []
                end
  end
end