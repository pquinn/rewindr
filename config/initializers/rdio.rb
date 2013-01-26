RDIO_CONSUMER_KEY = "kmbhq22vhcrxhkhedzujybee"
RDIO_CONSUMER_SECRET = "DXHfxVcr3x"

RDIO = RdioApi.new(:consumer_key => RDIO_CONSUMER_KEY, :consumer_secret => RDIO_CONSUMER_SECRET)

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :rdio, RDIO_CONSUMER_KEY, RDIO_CONSUMER_SECRET
end