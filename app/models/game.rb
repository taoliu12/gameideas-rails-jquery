class Game < ApplicationRecord
    # belongs_to :user
    has_many :suggestions
    validates :title, :presence => true
    validates :summary, :presence => true
end
