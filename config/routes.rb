Rails.application.routes.draw do
  resources :games
  root 'games#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'

  resources :users, :only =>  [:new, :create]
end
