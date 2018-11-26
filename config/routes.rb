Rails.application.routes.draw do
  root 'application#welcome'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'

  resources :users, :only =>  [:new, :create]
end
