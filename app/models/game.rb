class Game < ApplicationRecord
    belongs_to :user
    belongs_to :genre
    has_many :suggestions
    
    validates :title, :presence => true
    validates :summary, :presence => true
end
