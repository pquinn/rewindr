class Echonest::RdioController < Echonest::BaseController
  respond_to :json
  
  def search
    if song_id = find_first_rdio_song_id_by_artist_and_title(params[:artist], params[:title])
      respond_with({:song_id => song_id})
    else
      head :not_found
    end
  end
end
