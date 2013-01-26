require 'spec_helper'

describe TracksController do
  describe 'GET index' do
    it 'gives the most recent song listened to by the user in the given timeframe' do
      get :index, :user_name => "Phillmatic19"
    end
  end
end
