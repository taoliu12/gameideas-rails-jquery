class Suggestion < ApplicationRecord
    belongs_to :game
    validates :content, :presence => true

    def greenlit?
        self.status == 1
    end

    def pending?
        self.status == 0
    end
end
