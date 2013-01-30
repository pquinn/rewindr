class TracksController < ApplicationController  
  def index    
    respond_to do |format|      
      format.json { render :json => lastfm }
    end
  end
  
  # def wall
  #   respond_to do |format|
  #     format.html do        
  #       gon.from_time    = 1.year.ago.to_i
  #       gon.to_time      = (1.year.ago + 7.days).to_i
  #       gon.user_name    = params[:user_name]
  #       gon.most_recent  = lastfm[0]["date"]["uts"] unless lastfm.blank?
  #       gon.least_recent = lastfm[-1]["date"]["uts"] unless lastfm.blank?
  #     end
  #   end
  # end
  
  private
  
  def lastfm
    @lastfm ||= LastfmHelper.get_recent_tracks(params)
  end
end
