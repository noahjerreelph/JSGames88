Rails.application.routes.draw do
  root 'user#index'
  post '/register' => 'user#register'
  post '/login' => 'user#login'
  post '/bright_ideas/post' => 'user#post'
  get '/bright_ideas' => 'user#main'
  get '/logout' => 'user#logout'
  get '/users/:id' => 'user#show'
  post '/bright_ideas/like/:user/:post' => 'user#add_like'
  delete '/bright_ideas/:post/destroy' => 'user#destroy'
  get '/bright_ideas/:id' => 'user#like'
  get 'user/register'

  get 'user/main'

  get 'user/like'

  get 'user/show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
