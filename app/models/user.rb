class User < ApplicationRecord
    has_secure_password
    validates :username, :presence => {:message => "Title can't be blank." }
    validates :username, uniqueness: {:message => 'Username already taken. Please use another username.'}
end
