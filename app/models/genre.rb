class Genre < ApplicationRecord
    has_many :games
    has_many :users, through: :games

    validates :name, uniqueness: {:message => 'Genre already exists.'}
end
