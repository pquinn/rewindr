class ApplicationController < ActionController::Base
  protect_from_forgery
  
  private
  
  def lastfm
    @lastfm ||= LastfmHelper.get_recent_tracks(params)
  end
end