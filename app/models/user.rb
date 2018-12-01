class User < ApplicationRecord
    has_many :games

    has_secure_password
    validates :username, presence: {:message => "Username can't be blank." }
    validates :username, uniqueness: {:message => 'Username already taken. Please use another username.'}
end
