class SuggestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :status
  belongs_to :user, serializer: SuggestionUserSerializer
end
