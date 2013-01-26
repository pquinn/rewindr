require 'spec_helper'

describe TracksController do
  describe 'GET index' do
    it 'gets the playlist for the given user' do
      get :index, :user_name => "Phillmatic19", :format => :json
      JSON.parse(response.body).should_not be_nil
    end
  end
end
