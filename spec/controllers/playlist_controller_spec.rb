require 'spec_helper'

describe PlaylistsController do
  describe 'GET show' do
    it 'gets the playlist for the given user' do
      get :show, :username => "Phillmatic19", :format => :json
      JSON.parse(response.body).should_not be_nil
    end
  end
end