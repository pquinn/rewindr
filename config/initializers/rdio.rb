RDIO_CONSUMER_KEY = "kmbhq22vhcrxhkhedzujybee"
RDIO_CONSUMER_SECRET = "DXHfxVcr3x"

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :rdio, RDIO_CONSUMER_KEY, RDIO_CONSUMER_SECRET
end