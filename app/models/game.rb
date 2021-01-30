class Game < ApplicationRecord
    belongs_to :user
    belongs_to :genre
    has_many :suggestions
    
    validates :title, :presence => true
    validates :summary, :presence => true
    validates :summary, :presence => true
    
    scope :newest_to_oldest, -> { order('created_at DESC') }

    def next
        self.class.where("id > ?", id).first
      end
    
      def previous
        self.class.where("id < ?", id).last
      end
    
end
