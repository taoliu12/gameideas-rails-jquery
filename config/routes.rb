Rails.application.routes.draw do
  root 'games#index'
  get '/games/my_games' => 'games#my_games', as: 'my_games'
  get '/games/newest_to_oldest' => 'games#newest_to_oldest', as: 'games_newest_to_oldest'

  resources :games do
    resources :suggestions
  end

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/auth/:provider/callback'  => 'sessions#create'
  
  resources :users, :only =>  [:new, :create]
end
