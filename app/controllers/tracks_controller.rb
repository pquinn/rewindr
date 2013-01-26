class TracksController < ApplicationController  
  def index    
    respond_to do |format|
      format.json { render :json => lastfm }
    end
  end
  
  def wall
    respond_to do |format|
      format.html do
        gon.track_data   = lastfm
        gon.user_name    = params[:user_name]
        gon.most_recent  = lastfm[0]["date"]["uts"]
        gon.least_recent = lastfm[-1]["date"]["uts"]
      end
    end
  end
  
  private
  
  def lastfm
    @lastfm ||= LastfmHelper.get_recent_tracks(params).shuffle.take(10)
  end
end
