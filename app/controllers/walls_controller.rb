class WallsController < ApplicationController
  def show
    respond_to do |format|
      format.html do        
        gon.from_time    = 1.year.ago.to_i
        gon.to_time      = (1.year.ago + 7.days).to_i
        gon.user_name    = params[:id]
        gon.most_recent  = lastfm[0]["date"]["uts"]  unless lastfm.blank?
        gon.least_recent = lastfm[-1]["date"]["uts"] unless lastfm.blank?
      end
    end
  end
end
