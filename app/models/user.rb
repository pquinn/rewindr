class User < ActiveRecord::Base
  attr_accessible :lastfm_username, :rdio_secret, :rdio_token
  
  def self.from_omniauth(auth)
    if auth['provider'] == 'rdio'
      find_or_create_by_rdio_uid!(auth['uid']) do |user|
        user.rdio_secret = auth["credentials"]["token"]
        user.rdio_token  = auth["credentials"]["secret"]
      end
    end
  end
end
