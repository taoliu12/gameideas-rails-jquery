class User < ApplicationRecord
    has_secure_password
    validates :username, presence: {:message => "Username can't be blank." }
    validates :username, uniqueness: {:message => 'Username already taken. Please use another username.'}

    def self.find_or_create_by_omniauth(auth_email)
        user = User.find_by_id(auth_email)
        if user
            user
        else
            user = User.new(email: auth_email)
            user.password = SecureRandom.hex
            user.save 
            user  
        end
    end
end
