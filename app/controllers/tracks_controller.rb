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
    @lastfm ||= LASTFM.user.get_recent_tracks(
                  :user  => params[:user_name], 
                  :from  => params[:from] || 365.days.ago.to_i,
                  :to    => params[:to]   || 364.days.ago.to_i,
                  :page  => params[:page],
                  :limit => params[:limit]
                )
  end
end
