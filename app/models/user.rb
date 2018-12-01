class User < ApplicationRecord
    has_many :games
    has_many :suggestions 
    #has many :suggested_games, through: suggestions, foreign_key: user_id

    has_secure_password
    validates :username, presence: {:message => "Username can't be blank." }
    validates :username, uniqueness: {:message => 'Username already taken. Please use another username.'}
end
