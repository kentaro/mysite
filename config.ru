$LOAD_PATH.unshift "./lib"

require 'appengine-rack'

AppEngine::Rack.configure_app(
  :application            => "kentarok",
  :precompilation_enabled => true,
  :version                => "1"
)

require 'mysite'
run Sinatra::Application
