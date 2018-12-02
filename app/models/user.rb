class User < ApplicationRecord
    has_many :games
    has_many :suggestions 
    has_many :suggested_games, through: :suggestions, :source => :game

    has_secure_password
    validates :username, presence: {:message => "Username can't be blank." }
    validates :username, uniqueness: {:message => 'Username already taken. Please use another username.'}
end
