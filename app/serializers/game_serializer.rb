class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :summary
  belongs_to :user
  belongs_to :genre
end
