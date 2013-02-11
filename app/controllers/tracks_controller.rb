class TracksController < ApplicationController  
  respond_to :json
  
  def show    
    respond_to do |format|      
      format.json { render :json => lastfm }
    end
  end
end
