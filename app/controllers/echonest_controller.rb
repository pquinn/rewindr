class EchonestController < ApplicationController
  respond_to :json
  
  def rdio_song_id
    response = HTTParty.get('http://developer.echonest.com/api/v4/song/search?bucket=tracks&bucket=audio_summary&bucket=id:rdio-US', :query => {
                :api_key =>"BWXNT5LWGYPXOT8AA",
                :format  =>"json",
                :results => 1,
                :artist => params[:artist],
                :title  => params[:title],
              }
          )
    raise response.body
    respond_with({:rdio_song_id => JSON.parse(response.body)['response']['songs'][0]['tracks'][0]['foreign_id'].match(/rdio-US:track:([\w\d]+)/)[1]})
  end
end
