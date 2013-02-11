require 'spec_helper'

describe TracksController do
  describe 'GET index' do
    it 'returns an array of data representing the users listening history from the past' do
      stub_request(:get, /http:\/\/ws.audioscrobbler.com\/2.0\/\?api_key=[\d\w]{32}&from=\d{10}(&limit=\d+)?&method=user.getRecentTracks&to=\d{10}&user=[\d\w]+/)
        .to_return(:status => 200, :body => fixture_io('lastfm/user.getrecenttracks/success.xml'), :headers => {})
      
      get :show, :id => "Phillmatic19", :format => 'json'
      
      response.should be_success
      JSON.parse(response.body).should be_kind_of(Array)
    end
    
    it 'doesnt crash if the user doesnt exist' do
      stub_request(:get, /http:\/\/ws.audioscrobbler.com\/2.0\/\?api_key=[\d\w]{32}&from=\d{10}(&limit=\d+)?&method=user.getRecentTracks&to=\d{10}&user=[\d\w]+/)
        .to_return(:status => 200, :body => fixture_io('lastfm/user.getrecenttracks/user_not_found.xml'), :headers => {})
      
      get :show, :id => "Phillmatic19", :format => 'json'
      
      response.should be_success
      JSON.parse(response.body).should eq([])
    end
    
    it 'doesnt crash if the user doesnt have any songs' do
      stub_request(:get, /http:\/\/ws.audioscrobbler.com\/2.0\/\?api_key=[\d\w]{32}&from=\d{10}(&limit=\d+)?&method=user.getRecentTracks&to=\d{10}&user=[\d\w]+/)
        .to_return(:status => 200, :body => fixture_io('lastfm/user.getrecenttracks/no_songs.xml'), :headers => {})
      
      get :show, :id => "Phillmatic19", :format => 'json'
      
      response.should be_success
      JSON.parse(response.body).should eq([])
    end
  end
end
