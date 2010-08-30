require 'sinatra'

set :views, File.dirname(__FILE__) + '/../templates'

get '/' do
  erb :index
end
