class User < ApplicationRecord
    has_many :games
    has_many :suggestions 
    has_many :suggested_games, through: :suggestions, :source => :game

    has_secure_password
    validates :username, presence: {:message => "Username can't be blank." }
    validates :username, uniqueness: {:message => 'Username already taken. Please use another username.'}

    def self.find_or_create_by_omniauth(omniauth_hash)
        user = User.find_by(:email => omniauth_hash[:email])
        if  omniauth_hash[:email]
            user = User.find_by(:email => omniauth_hash[:email])
            user
        else 
            user = User.find_or_create_by(username: omniauth_hash[:nickname]) do |user|
                user.email =  "#{omniauth_hash[:nickname]}@noemail.com"
                user.username = omniauth_hash[:nickname]
                user.password = SecureRandom.hex
            end
            user  
        end
    end
end
