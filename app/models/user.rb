class User < ActiveRecord::Base
  attr_accessible :lastfm_username, :rdio_secret, :rdio_token
end
