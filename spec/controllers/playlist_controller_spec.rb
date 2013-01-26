require 'spec_helper'

describe PlaylistsController do
  describe 'GET show' do
    it 'gets the playlist for the given user' do
      Lastfm.user.stub(:get_recent_tracks).and_return(fixture_io("user.getrecenttracks.json"))
      LASTFM.user.get_recent_tracks(343, 3424)
      
      get :show, :username => "Phillmatic19", :format => :json
      response.body.should eq(3)
    end
  end
end