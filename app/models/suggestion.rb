class Suggestion < ApplicationRecord
    belongs_to :game
    belongs_to :user
    validates :content, :presence => true
    validates :content,  :presence => true
    
    scope :newest_to_oldest, -> { order('created_at DESC') }
    scope :recent, -> { newest_to_oldest.limit(5) }

    def greenlit?
        self.status == 1
    end

    def pending?
        self.status == 0
    end
end
