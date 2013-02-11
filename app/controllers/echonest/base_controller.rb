class Echonest::BaseController < ApplicationController
  BASE_URL = "http://developer.echonest.com/api/v4/"
  DEFAULT_BUCKET_PARAMS = "bucket=tracks&bucket=audio_summary&bucket=id:rdio-US"
  
  def find_first_rdio_song_id_by_artist_and_title(artist, title)
    response = HTTParty.get("#{BASE_URL}song/search?#{DEFAULT_BUCKET_PARAMS}", 
                :query => {
                  :api_key =>"BWXNT5LWGYPXOT8AA",
                  :format  =>"json",
                  :results => 1,
                  :artist  => artist,
                  :title   => title,
                }
              )
    
    parsed_response = JSON.parse(response.body)
    first_song      = parsed_response['response']['songs'].first
    
    if first_song
      first_track = first_song['tracks'].first
      first_track['foreign_id'].match(/rdio-US:track:([\w\d]+)/)[1]
    end 
  end
end
