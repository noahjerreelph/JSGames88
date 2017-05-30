Rails.application.routes.draw do
  root 'user#index'
  get '/register' => 'user#register'
  post '/create' => 'user#new_user'
  post '/login' => 'user#login'

  get '/borrower' => 'user#borrow'
  get '/lender' => 'user#lend'
  get '/logout' => 'user#logout'

  post '/lending/:id' => 'user#lending'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
