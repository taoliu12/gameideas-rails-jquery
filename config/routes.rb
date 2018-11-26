Rails.application.routes.draw do
  root 'site#welcome'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'

  resources :users, :only =>  [:new, :create]
end
