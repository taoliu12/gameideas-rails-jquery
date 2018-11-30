Rails.application.routes.draw do
  resources :games do
    resources :suggestions
  end

  root 'games#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  resources :users, :only =>  [:new, :create]
end
