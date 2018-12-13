class Suggestion < ApplicationRecord
    belongs_to :game
    belongs_to :user
    validates :content, :presence => true
    scope :recent, -> { all.limit(5) }

    def greenlit?
        self.status == 1
    end

    def pending?
        self.status == 0
    end
end
