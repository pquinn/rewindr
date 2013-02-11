require 'spec_helper'

describe Echonest::RdioController do
  describe "GET search" do
    it "returns the rdio id of the first song returned by echonest" do
      stub_request(:get, /http:\/\/developer.echonest.com\/api\/v4\/song\/search\?api_key=\S{17}&artist=radiohead&bucket=id:rdio-US&format=json&results=1&title=creep/).
        to_return(:status => 200, :body => fixture_io('echonest/success.json'), :headers => {})
               
      get :search, :artist => "radiohead", :title => "creep", :format => "json"
      
      JSON.parse(response.body).should eq({"song_id" => "t2350537"})
    end
    
    it "returns a 404 when no song is found" do
      stub_request(:get, /http:\/\/developer.echonest.com\/api\/v4\/song\/search\?api_key=\S{17}&artist=radiohead&bucket=id:rdio-US&format=json&results=1&title=asdfffdas/).
        to_return(:status => 200, :body => fixture_io('echonest/no_songs.json'), :headers => {})
               
      get :search, :artist => "radiohead", :title => "asdfffdas", :format => "json"
      
      response.code.should eq("404")
    end
  end
end
