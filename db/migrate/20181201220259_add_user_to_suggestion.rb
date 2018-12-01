class AddUserToSuggestion < ActiveRecord::Migration[5.2]
  def change
    add_column :suggestions, :user_id, :string
  end
end
