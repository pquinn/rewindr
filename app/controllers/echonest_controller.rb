class EchonestController < ApplicationController
  respond_to :json
  
  def rdio_song_id
    if song_id = Echonest.find_first_rdio_song_id_by_artist_and_title(params[:artist], params[:title])
      respond_with({:rdio_song_id => song_id})
    else
      head :not_found
    end
  end
end
